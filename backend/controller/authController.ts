import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { User } from "../model/userModel";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import multer from "multer";
import * as crypto from "crypto";

import { MulterFiles } from "./postController";
import sharp from "sharp";
import { Email } from "../utils/email";
import { createSendToken, signToken } from "../utils/tokenGeneration";
import ResetPassword from "../../client/emails/ResetPassword";
dotenv.config();

export const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    console.log(name);
    //check if name .password and email was entered
    if (!name) {
      return res.json({ error: "name is required" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: `password is required and should be atleast 6 characters long`,
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return AppError("email is taken", 401);
    }

    const defaultImage = `/public/img/userImage/default.svg`;
    // const hashedPaswords = await hashPaswords(password);
    const user = await User.create({
      name,
      email,
      password,
      profileImage: defaultImage,
    });

    return res.json(user);
  },
);

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    //!step for check login credential
    //!1) check email and password if it exists
    if (!email || !password) {
      const err = AppError("please provide email and password", 400);
      return next(err); //finish because we want to stop the function here
    }

    //!
    //!2) check is the user exist password is correct
    const user = await User.findOne({ email: email }).select(
      "+password +isValidated",
    ); //select use to get the password from DB eventhough they are on selected by default refer to password in userModel
    // (user.isValidated); //! this is for validation turn back on later
    // if (user.isValidated === false) {
    //   return next(AppError('Please check your email for validation', 401));
    // }
    if (!user || !(await user.comparePassword(password, user.password))) {
      const err = AppError("please provide correct Email or password  ", 401);
      return next(err);
    }
    //!3) if everything ok ,send the token to client

    createSendToken(user, 200, res);
  },
);

export const logout = (req: Request, res: Response) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) return res.status(204);
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, //https
    sameSite: "lax", //cross site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ message: "send" });
};

function filterObjectsForUpdateUser(
  reqBodyObject: any,
  ...allowedFields: string[]
) {
  const newObjects: { [key: string]: any } = {};
  Object.keys(reqBodyObject).forEach((key) => {
    if (allowedFields.includes(key)) {
      newObjects[key] = reqBodyObject[key];
    }
  });
  return newObjects;
}

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(AppError("please upload a image file only ", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadUserPhoto = upload.single("profileImage");
export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file, "here");
    if (!req.user) {
      return next(AppError("please login", 401));
    }
    const files = req.files as unknown as MulterFiles;
    console.log(files, "here file check");

    if (!req.file) {
      // No files uploaded, proceed to the next middleware
      return next();
    }
    req.body.filename = `user=${req.user.id}-${Date.now()}.webp`;
    await sharp(req.file.buffer)
      .toFormat("webp")
      .webp({ quality: 80 })
      .toFile(`public/img/posts/${req.body.filename}`);
    next();
  },
);

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(AppError("please login", 401));
    }
    const currentUser = await User.findById(user.id);
    if (currentUser?.changedPasswordAfter(user.iat as number)) {
      return next(AppError("user change password recently", 401));
    }
    if (req.body.name < 5) {
      return next(AppError("Invalid username need atleast 5 characters", 401));
    }
    console.log(req.body.filename, "file name here");
    const filterBody = filterObjectsForUpdateUser(req.body, "name", "email");
    if (req.file) {
      filterBody.profileImage = req.body.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user?.id, filterBody, {
      new: true,
      runValidators: true,
    });
    console.log(updatedUser);
    res.status(200).json({
      updatedUser,
    });
  },
);
export const getProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user, "user");
    const user = req.user;

    if (!user) {
      return next(AppError("Please log in again", 401));
    }
    const currentUser = await User.findById(user.id);
    if (currentUser?.changedPasswordAfter(user.iat as number)) {
      return next(AppError("user change password recently", 401));
    }
    const profile = await User.findById(user.id)
      .select("-password -passwordResetExpired -passwordResetToken")
      .populate("posts");

    if (!profile) {
      return next(AppError("Profile not found", 401));
    }
    console.log(profile);
    res.json(profile);
  },
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email }); //this will get the user by email
    if (!user) {
      return next(AppError("user not found", 404));
    } //this is use to save the reset token
    const resetToken = user.createPasswordResetToken(); //this will create the reset token using the methods

    await user.save({ validateBeforeSave: false }); //this is use to save the reset token
    try {
      const resetPageUrl = `${req.protocol}://localhost:5173/resetPassword/${resetToken}`; //this will get the url
      const type = "reset";
      const resetURL = `${req.protocol}://${req.get(
        "host",
      )}/api/auth/resetPassword/${resetToken}`; //this will get the url to send the the password reset
      const message = `forgot your password? Submit a PATCH request with your new password and password Confirm to ${resetPageUrl}.\n if you did not forget your password ,pls ignore this message`;
      const html = ResetPassword({
        name: user.name.split(" ")[0],
        url: resetPageUrl,
      });
      await new Email(
        user,
        resetPageUrl,
        resetURL,
        message,
        type,
        html,
      ).sendPasswordReset();

      res.status(200).json({
        status: "success",
        message: "your reset token  password email have been send",
        resetToken,
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpired = undefined;
      await user.save({ validateBeforeSave: false });
      console.log(error);
      return next(AppError("There wass a error while sending a email ", 500));
    }
  },
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.token, "here tokens params");
    console.log(req.body);
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    console.log(hashedToken, "here");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpired: { $gt: Date.now() }, //this use to compare the expire time
    });
    console.log(user, "here null");
    if (!user) {
      return next(AppError("Token is invalid or expired", 400));
    }
    user.password = req.body.password;
    user.passwordConfirmed = req.body.passwordConfirmed;
    user.passwordResetExpired = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    const token = signToken(user._id);
    res.status(200).json({ status: "success", token });
  },
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    if (!req.user) {
      return next(AppError("Please Log in ", 401));
    }
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return next(AppError("User did not exist", 404));
    }
    if (
      !(await user.comparePassword(req.body.currentPassword, user.password))
    ) {
      return next(AppError("Password  is not the same", 404));
    }
    user.password = req.body.password;
    user.passwordConfirmed = req.body.passwordConfirmed;
    await user.save();
    res.status(200).json({ status: "woriking", user });
  },
);
