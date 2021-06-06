const {
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
} = require("../../utils/authMethods");


//server should check data before going to database
function checkIsEmailFunc(req, res, next) { //method which checks that variable have right email format eg @--.com
  const { errorObj } = res.locals;

  if (!checkIsEmail(req.body.email)) {
    errorObj.wrongEmailFormat = "Must be in email format!";
  }

  next(); // go to the next middleware function in the CURD methods
}

function checkIsAlphaFunc(req, res, next) {
  const { errorObj } = res.locals;
  const inComingData = req.body;
  for (key in inComingData) {
    if (key === "firstName" || key === "lastName") { //method which checks that variable only contain alphabets
      if (!checkIsAlpha(inComingData[key])) {
        errorObj[`${key}`] = `${key} can only have characters`;
      }
    }
  }

  next(); // go to the next middleware function in the CURD methods
}

function checkIsAlphanumericFunc(req, res, next) { //method which checks that variable only contain alphabets and numbers
  const { errorObj } = res.locals;
  if (!checkIsAlphanumeric(req.body.username)) {
    errorObj.usernameError = "username can only have characters and numbers";
  }

  next(); // go to the next middleware function in the CURD methods
}

module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
};
//exporting object
