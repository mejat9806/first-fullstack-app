import multer from "multer";
import { AppError } from "./appError";
import { catchAsync } from "./catchAsync";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";

const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(AppError("Please upload an image file only", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
// export const uploadUserPhoto = upload.single("profileImage");
export const uploadImage = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "bannerImage", maxCount: 1 },
]);

export const resizeAndUploadImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(AppError("Please login", 401));
    }
    if (!req.files) {
      return next();
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    console.log(files, "files check");

    if (files.profileImage && files.profileImage.length > 0) {
      const buffer = await sharp(files.profileImage[0].buffer)
        .toFormat("webp")
        .webp({ quality: 100 })
        .toBuffer();

      const profileUploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) {
              console.error("Cloudinary upload error: ", error);
              return reject(AppError("Image upload failed", 500));
            }
            req.body.profileImage = result?.secure_url;
            resolve(result?.secure_url);
          })
          .end(buffer);
      });

      await profileUploadResult;
    }

    if (files.bannerImage && files.bannerImage.length > 0) {
      const buffer = await sharp(files.bannerImage[0].buffer)
        .toFormat("webp")
        .webp({ quality: 100 })
        .toBuffer();

      const bannerUploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) {
              console.error("Cloudinary upload error: ", error);
              return reject(AppError("Image upload failed", 500));
            }
            req.body.bannerImage = result?.secure_url;
            resolve(result?.secure_url);
          })
          .end(buffer);
      });

      await bannerUploadResult;
    }

    next();
  },
);
