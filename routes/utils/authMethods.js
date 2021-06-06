//refactoring 
// rewriting all methods available in validator so that incase we have to make any change we just do it in one place. 

const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator");  //bring in validators package prewritten methods

const checkIsEmpty = (target) => (isEmpty(target) ? true : false);

const checkIsStrongPassword = (password) =>
  isStrongPassword(password) ? true : false;

const checkIsEmail = (email) => (isEmail(email) ? true : false);

const checkIsAlpha = (target) => (isAlpha(target) ? true : false);

const checkIsAlphanumeric = (target) => (isAlphanumeric(target) ? true : false);

module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
};
