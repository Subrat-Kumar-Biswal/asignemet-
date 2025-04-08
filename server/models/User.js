import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  conformPassword: {
    type: String,
    required: true,
  },
});
const userModel = mongoose.model("RegisterUser", userSchema);

export default userModel;
//       console.log(response.data);
