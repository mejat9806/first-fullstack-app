userModel

import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface User extends Document {
  email: string;
  name: string;
  password: string;
  passwordConfirmed: string | undefined;
  profileImage: string;
  active: boolean;
  posts: mongoose.Types.ObjectId;

  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpired: Date;

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
  posts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  ],

  passwordConfirmed: String,
  profileImage: { type: String, default: "defaultUser.svg" },
  active: { type: Boolean, default: true },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpired: Date,
});

// Define the comparePassword method
userSchema.methods.comparePassword = async function (
  inputPassword: string,
  passFromDB: string,
) {
  return bcrypt.compare(inputPassword, passFromDB);
};

userSchema.pre<User>(/^find/, function (next) {
  this.populate({
    path: "posts",
  });
  next();
});

userSchema.pre<User>("save", async function (next) {
  // Hash password before saving
  if (this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirmed = undefined;
  next();
});
userSchema.pre<User>("save", function (next) {
  // This middleware will run when the password is modified, except when a new user is created.
  // It updates the passwordChangedAt field to the current date and time minus 1000 milliseconds.
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

export const User: Model<User> = mongoose.model<User>("User", userSchema);

Post model 

import mongoose, { Document, Model } from "mongoose";

import slugify from "slugify";

interface PostType extends Document {
  title: string;
  detail: string;
  author: mongoose.Types.ObjectId;
  createAt: Date;
  slug: string;
  image: string;
}

const postSchema = new mongoose.Schema<PostType>(
  {
    title: {
      type: "string",
      required: [true, "must have a tittle"],
    },
    detail: {
      type: "string",
      required: [true, "must have a post detail"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    slug: { type: "string" },
    image: { type: "string" },
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
postSchema.pre("save", function (next) {
  this.slug = slugify(`${this.title}-${this._id}`, { lower: true });
  next();
});

postSchema.pre<PostType>(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "-__v -password",
  });
  next();
});

export const Post: Model<PostType> = mongoose.model<PostType>(
  "Post",
  postSchema,
);
