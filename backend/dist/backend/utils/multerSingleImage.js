import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { AppError } from "./appError.js";
import { catchAsync } from "./catchAsync.js";
import sharp from "sharp";
import cloudinary from "./cloudinary.js";
import { User } from "../model/userModel.js";
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(AppError("Please upload an image file only", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadImage = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "bannerImage", maxCount: 1 },
]);
export const resizeAndUploadImages = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(AppError("Please login", 401));
  }
  const userData = await User.findById(req.user.id);
  console.log(userData, "userData");
  if (!userData) {
    return next(AppError("no user found", 404));
  }
  console.log(req.user, "req.user.bannerImagePublicId");
  const files = req.files;
  // Function to upload image to Cloudinary and return public_id
  const uploadToCloudinary = async (file) => {
    if (!file) {
      throw AppError("File not found", 400);
    }
    const buffer = await sharp(file.buffer)
      .toFormat("webp")
      .webp({ quality: 100 })
      .toBuffer();
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            console.error("Cloudinary upload error: ", error);
            return reject(AppError("Image upload failed", 500));
          }
          if (!result) {
            return reject(
              AppError("Cloudinary upload failed: result is undefined", 500),
            );
          }
          resolve(result.public_id);
        })
        .end(buffer);
    });
  };
  try {
    // Handle profile image upload
    if (files.profileImage && files.profileImage.length > 0) {
      const profileImagePublicId = await uploadToCloudinary(
        files.profileImage[0],
      );
      req.body.profileImage = files.profileImage[0].path; // Set URL or path to profile image
      req.body.profileImagePublicId = profileImagePublicId;
      // Optionally delete old profile image if it exists in Cloudinary
      if (userData.profileImagePublicId) {
        await cloudinary.uploader.destroy(userData.profileImagePublicId);
      }
    }
    // Handle banner image upload
    if (files.bannerImage && files.bannerImage.length > 0) {
      const bannerImagePublicId = await uploadToCloudinary(
        files.bannerImage[0],
      );
      req.body.bannerImage = files.bannerImage[0].path; // Set URL or path to banner image
      req.body.bannerImagePublicId = bannerImagePublicId;
      // Optionally delete old banner image if it exists in Cloudinary
      if (userData.bannerImagePublicId) {
        await cloudinary.uploader.destroy(userData.bannerImagePublicId);
      }
    }
    next();
  } catch (err) {
    console.error("Error uploading images:", err);
    return next(AppError("Failed to upload images", 500));
  }
});
