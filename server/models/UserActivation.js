import mongoose from "mongoose";

const userActivationSchema = new mongoose.Schema({
  _id: String,
  email: String,
  full_name: String,
  profile_picture: String,
  username: String,
});

const UserActivation = mongoose.model("UserActivation", userActivationSchema);

export default UserActivation;
