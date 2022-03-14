const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  contact: String,
  currentOrganization: String,
  image: String,
});

const User = mongoose.model("friends", UserSchema);

module.exports = User;
