const { checkIsStrongPassword } = require("../../utils/authMethods");

function checkIsStrongPasswordFunc(req, res, next) { //method which checks that variable  must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8
  //let errorObj = {};

  const { errorObj } = res.locals;

  if (!checkIsStrongPassword(req.body.password)) {
    errorObj.weakPassword =
      "Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8";
  }

  next(); // go to the next middleware function in the CURD methods
}

module.exports = checkIsStrongPasswordFunc;
