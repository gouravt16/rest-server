import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  linkedinURL: String,
  summary: String,
  skills: Array,
  achievement: Array,
  contact: String,
  currentOrganization: String,
  image: String,
});

const User = mongoose.model("friends", UserSchema);

export default User;
