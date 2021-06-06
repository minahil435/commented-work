const { checkIsEmpty } = require("../../utils/authMethods");

//this function checks any incoming data is empty if is empty send error message back
//else go to the next middleware function next()
function checkIsEmptyFunc(req, res, next) {
  let inComingData = req.body;

  const { errorObj } = res.locals; //making a error object to tell user's error

  for (let key in inComingData) {
    if (checkIsEmpty(inComingData[key])) {      //checking length of "value" of the "keys"
      errorObj[key] = `${key} cannot be empty`;  //if any value is empty add that in the errorObject
    }
  }

  //used for loop to cut out bunch of code and now keys are dynamic

  if (Object.keys(errorObj).length > 0) { //check the objects keys' length. comparing to zero because empty array length is zero
    return res.status(500).json({ message: "failure", payload: errorObj });
  } else {
    next(); // go to the next middleware function in the CURD methods
  }
}

module.exports = checkIsEmptyFunc;
