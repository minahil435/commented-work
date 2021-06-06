const express = require("express");
const router = express.Router();
// Bringing in Express

const { signup, login } = require("./controller/userController");

// many validations have to check on both method(signup,login) so we have to pull out what is use in multiple cases to avoid repetition 
const checkIsUndefined = require("./helpers/checkIsUndefined");
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");
const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc");

const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware");

router.post(
  "/sign-up",
  checkIsUndefined, // these functions are called middleware and they are run im sequence
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
  signup
);

router.post(
  "/login",
  checkIsUndefined, // these functions are called middleware and they are run im sequence
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);

module.exports = router;
