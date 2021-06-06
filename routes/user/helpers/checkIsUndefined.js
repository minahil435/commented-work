function checkIsUndefined(req, res, next) {
  if (Object.keys(req.body).length === 0) { // if user send empty json object then the re.body length will be zero
    return res.status(500).json({ message: "Please fill out the form" }); //wont do any other check if no value there
  } else {
    let errorObj = {};
    res.locals.errorObj = errorObj; // allow you to store local variable through out time of request. Initially its an empty object which is given by express.
    next(); // go to the next middleware function in the CURD methods
  }
}

module.exports = checkIsUndefined;
