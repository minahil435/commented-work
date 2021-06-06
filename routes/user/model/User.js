const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String, // check if input is correct data type
  },
  lastName: {
    type: String, // check if input is correct data type
  },
  username: {
    type: String, // check if input is correct data type
    unique: true,
  },
  email: {
    type: String,
    unique: true, // Check and prevent duplication
  },
  password: {
    type: String,
  },
});


//DataBase validation
module.exports = mongoose.model("user", userSchema);
