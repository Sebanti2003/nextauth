import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotpasswordtoken: String,
    forgotpasswordtokenExpiry: Date,
    verifytoken: String,
    verifytokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
