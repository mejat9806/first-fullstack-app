import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType extends Document {
  email: string;
  name: string;
  password: string;
  passwordConfirmed: string | undefined;
  profileImage: string;
  active: boolean;
  posts: mongoose.Types.ObjectId[];

  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpired: Date;

  comparePassword: (
    inputPassword: string,
    passFromDB: string,
  ) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserType>(
  {
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
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

    passwordConfirmed: String,
    profileImage: { type: String, default: "defaultUser.svg" },
    active: { type: Boolean, default: true },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpired: Date,
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

// Define the comparePassword method

userSchema.pre<UserType>("save", async function (next) {
  // Hash password before saving
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirmed = undefined;
  next();
});
userSchema.methods.comparePassword = async function (
  inputPassword: string,
  passFromDB: string,
) {
  return bcrypt.compare(inputPassword, passFromDB);
};
userSchema.pre<UserType>(/^find/, function (next) {
  this.populate({
    path: "posts",
  });
  next();
});
userSchema.pre<UserType>("save", function (next) {
  // This middleware will run when the password is modified, except when a new user is created.
  // It updates the passwordChangedAt field to the current date and time minus 1000 milliseconds.
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

export const User: Model<UserType> = mongoose.model<UserType>(
  "User",
  userSchema,
);
