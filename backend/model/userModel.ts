import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface User extends Document {
  email: string;
  name: string;
  password: string;
  passwordConfirmed: string | undefined;
  profileImage: string;
  comparePassword: (
    inputPassword: string,
    passFromDB: string,
  ) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 8,
  },
  passwordConfirmed: String,
  profileImage: { type: String, default: "defaultUser.svg" },
});

// Define the comparePassword method
userSchema.methods.comparePassword = async function (
  inputPassword: string,
  passFromDB: string,
) {
  return bcrypt.compare(inputPassword, passFromDB);
};

userSchema.pre<User>("save", async function (next) {
  // Hash password before saving
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.passwordConfirmed = undefined;
  next();
});

export const User: Model<User> = mongoose.model<User>("User", userSchema);
