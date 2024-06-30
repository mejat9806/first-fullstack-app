import mongoose, { Document, Model, ObjectId, Query } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import * as crypto from "crypto";

export interface UserType extends Document {
  email: string;
  name: string;
  password: string;
  passwordConfirmed: string | undefined;
  profileImage: string;
  active: boolean;
  posts: any;
  bookmark: mongoose.Schema.Types.ObjectId[];
  bio: string;
  joinDate: Date;
  following: mongoose.Schema.Types.ObjectId[];
  followers: mongoose.Schema.Types.ObjectId[];
  likePosts: mongoose.Schema.Types.ObjectId[];
  followCount: number;
  followerCount: number;
  passwordChangedAt: Date;
  passwordResetToken: string | undefined;
  passwordResetExpired: Date | undefined;
  bannerImage: string;
  changedPasswordAfter: (JWTtimestamp: number) => boolean;
  createPasswordResetToken: () => string;
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
      minlength: 5,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      validate: [validator.isEmail, "must be a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 8,
    },

    likePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    bookmark: [{ type: mongoose.Schema.Types.ObjectId, ref: "BookMark" }],
    joinDate: { type: Date, default: Date.now() },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    passwordConfirmed: String,
    profileImage: { type: String, default: "defaultUser.svg" },
    active: { type: Boolean, default: true, select: false },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpired: Date,
    bio: { type: String },
    bannerImage: { type: String },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Follower" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Follower" }],
    followCount: { type: Number, default: 0 },
    followerCount: { type: Number, default: 0 },
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

userSchema.pre("save", async function (next) {
  // Hash password before saving
  if (!this.isModified("password")) return next(); //this will check if there is no a change for the password
  this.password = await bcrypt.hash(this.password, 12); //this will hash the password

  this.passwordConfirmed = undefined; //this will set the passwordConfirmed to undefined after saving
  next();
});

userSchema.pre("save", function (next) {
  // This middleware will run when the password is modified, except when a new user is created.
  // It updates the passwordChangedAt field to the current date and time minus 1000 milliseconds.
  if (!this.isModified("password") || this.isNew) return next(); //if there is no change to the password

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.methods.comparePassword = async function (
  inputPassword: string,
  passFromDB: string,
) {
  return bcrypt.compare(inputPassword, passFromDB);
};

// Explicitly type the 'this' context as a Mongoose query object for query middleware hooks
// userSchema.pre<Query<any, UserType>>(/^find/, function (next) {
//   this.populate({
//     path: "posts",
//     model: "Post",
//   });
//   next();
// });
// userSchema.pre<Query<any, UserType>>(/^find/, function (next) {
//   this.populate({
//     path: "bookmark",
//     model: "BookMark",
//   });
//   next();
// });
// userSchema.pre<Query<any, UserType>>(/^find/, function (next) {
//   this.populate({
//     path: "likePosts",
//     populate: [
//       {
//         path: "user",
//         model: "User",
//       },
//       {
//         path: "post",
//         model: "Post",
//       },
//     ],
//   });
//   next();
// });

// userSchema.pre<Query<any, UserType>>(/^find/, function (next) {
//   this.populate({
//     path: "followers",
//     model: "Follower",
//   });
//   next();
// });
// userSchema.pre<Query<any, UserType>>(/^find/, function (next) {
//   this.populate({
//     path: "following",
//     model: "Follower",
//   });
//   next();
// });
// userSchema.pre<Query<any, UserType>>(/^find/, function (next) {
//   this.populate([
//     {
//       path: "followers",
//       model: "Follower",
//       populate: {
//         path: "user",
//         model: "User",
//         select: "-posts",
//       },
//     },
//     { path: "following", model: "Follower" },
//   ]);
//   next();
// });

userSchema.methods.changedPasswordAfter = function (JWTtimestamp: number) {
  //this will update the password after change time
  if (this.passwordChangedAt) {
    //if the the current document has the passwordChangedAt property
    const chnagedTimeStamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(), //this will gert the change time in milliseconds
      10,
    );
    return JWTtimestamp < chnagedTimeStamp; //this
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function (this: UserType) {
  const randRestToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(randRestToken)
    .digest("hex");
  console.log(this.passwordResetToken, "in model");
  this.passwordResetExpired = new Date(Date.now() + 10 * 60 * 1000);
  return randRestToken;
};

export const User: Model<UserType> = mongoose.model<UserType>(
  "User",
  userSchema,
);
