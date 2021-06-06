const bcrypt = require("bcryptjs");
// bringing bcryptjs
const User = require("../model/User");
// going one levelup

const jwt = require("jsonwebtoken");
// bring in jasonwetoekn

async function signup(req, res) {
  const { username, email, password, firstName, lastName } = req.body;

  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let salt = await bcrypt.genSalt(12); //generate a hash/ket for encoding the user passport 
    let hashedPassword = await bcrypt.hash(password, salt); //generate strong encoded password

    const createdUser = new User({ // making new user object 
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    let savedUser = await createdUser.save(); //return a promise which in this case is user object

    res.json({ message: "success", data: savedUser });
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
}

async function login(req, res) {
  const { email, password } = req.body; //extractinh user email and password sent as json in get request 

  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let foundUser = await User.findOne({ email: email }); //this function go tho the DB and see if user exist in the DB

    if (!foundUser) { //result of above function is either the user object or null
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
    } else {
      //password = 1, foundUser.password = $2a$12$tauL3AEb5gvKdcQdDKNWLeIYv422jNq2aRsaNWF5J4TdcWEdhq4CO
      let comparedPassword = await bcrypt.compare(password, foundUser.password); //to compare the encoded password

      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
      } else {
        let jwtToken = jwt.sign( //it takes an object-> which tells which information you want to expose
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.PRIVATE_JWT_KEY, //secret key which needed to be hidden so its hidden in .env
          {
            expiresIn: "1d", //when does it expires 1d = one day
          }
        );

        res.json({ message: "success", payload: jwtToken });// return a string instead of token, we get a batchback
      }
    }
  } catch (e) {
    res.json({ message: "error", error: e });
  }
}

module.exports = { signup, login };
