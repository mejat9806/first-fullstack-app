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
dotenv.config();

export const test = (req: Request, res: Response) => {
  res.json({ error: "test is working" });
};
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
    if (!email || !password) {
      return next(AppError("email and password is required", 401));
    }
    console.log(password);
    const user = await User.findOne({ email });
    if (!user) {
      return next(AppError("User not found", 404));
    }
    //check password matches
    const match = await user.comparePassword(password, user.password);
    if (!match) {
      const err = AppError("please provide correct Email or password  ", 401);
      return next(err);
    }
    if (match) {
      const accessToken = jwt.sign(
        { user },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "10d",
        },
      );
      jwt.sign(
        {
          email: user.email,
          id: user.id,
          name: user.name,
          profileImage: user.profileImage,
        },
        process.env.JWT_SECRET_KEY as string,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: "lax",
            })
            .json({ accessToken, user });
        },
      );
    }
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
    console.log(req.user);
    if (!req.user) {
      return next(AppError("Please log in again", 401));
    }
    res.json(req.user);
  },
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email }); //this will get the user by email
    if (!user) {
      return next(AppError("user not found", 404));
    } //this is use to save the reset token
    const resetToken = user?.createPasswordResetToken(); //this will create the reset token using the methods

    await user.save({ validateBeforeSave: false }); //this is use to save the reset token
    try {
      const resetURL = `${req.protocol}://${req.get(
        "host",
      )}/api/auth/resetPassword/${resetToken}`; //this will get the url
      const message = `forgot your password? Submit a PATCH request with your new password and password Confirm to ${resetURL}.\n if you did not forget your password ,pls ignore this message`;
      console.log(resetURL);
      await new Email(user, resetURL, message).sendPasswordReset();
      res.status(200).json({
        status: "success",
        message: "your reset token  password email have been send",
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
    console.log(req.params.token);
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordChangedAt: { $gt: Date.now() },
    });
    if (!user) {
      return next(AppError("Token is invalid or expired", 400));
    }
    user.password = req.body.password;
    user.passwordConfirmed = req.body.passwordConfirmed;
    user.passwordResetExpired = undefined;
    user.passwordResetToken = undefined;
    await user.save();
  },
);
