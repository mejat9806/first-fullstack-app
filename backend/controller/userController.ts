import { NextFunction, Request, Response } from "express";
import { User } from "../model/userModel";
import multer from "multer";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { MulterFiles } from "./postController";
import sharp from "sharp";

export const getAlluser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const amountOfDoc = await User.countDocuments();

    const allUser = await User.find();
    if (!allUser) {
      return res.status(404).json({ message: "No user found." });
    }
    res.status(200).json({ amountOfDoc, data: allUser });
  } catch (error) {}
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorId = req.params.id;
    if (!req.params.id) {
      return res.status(404).json({ message: "No user found." });
    }

    const allUser = await User.findById(req.params.id).populate("posts");
    console.log(allUser);
    res.status(200).json({ data: allUser });
  } catch (error) {
    next();
  }
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(AppError("please upload a image file only ", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserPhote = upload.single("profileImage");

export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as unknown as MulterFiles;
    console.log(files, "here file check");

    if (!files || !files.image) {
      // No files uploaded, proceed to the next middleware
      return next();
    }
    req.body.profileImage = `user=${req.user.id}-${Date.now()}.webp`;
    await sharp(req.file?.buffer)
      .toFormat("jpeg")
      .webp({ quality: 80 })
      .toFile(`public/img/posts/${req.body.profileImage}`);
    next();
  },
);
