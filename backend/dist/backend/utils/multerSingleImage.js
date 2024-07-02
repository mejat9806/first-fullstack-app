import multer from "multer";
import { AppError } from "./appError";
import { catchAsync } from "./catchAsync";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
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
export const resizeAndUploadImages = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(AppError("Please login", 401));
  }
  if (!req.files) {
    return next();
  }
  const files = req.files;
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
});

// const multerStorage = multer.memoryStorage();
// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image")) {
//         cb(null, true);
//     }
//     else {
//         cb(AppError("please upload a image file only ", 400), false);
//     }
// };
// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
// // export const uploadUserPhoto = upload.single("profileImage");
// export const uploadImage = upload.fields([
//     { name: "profileImage", maxCount: 1 },
//     { name: "bannerImage", maxCount: 1 },
// ]);
// export const resizeUserPhoto = catchAsync(async (req, res, next) => {
//     if (!req.user) {
//         return next(AppError("please login", 401));
//     }
//     if (!req.files) {
//         return next();
//     }
//     const files = req.files;
//     console.log(files, "jere");
//     if (files.profileImage && files.profileImage.length > 0) {
//         req.body.profileImage = `user=${req.user.id}-${Date.now()}.webp`;
//         await sharp(files.profileImage[0].buffer)
//             .toFormat("webp")
//             .webp({ quality: 100 })
//             .toFile(`public/img/posts/${req.body.profileImage}`);
//     }
//     if (files.bannerImage && files.bannerImage.length > 0) {
//         console.log("get here");
//         req.body.bannerImage = `userBanner=${req.user.id}-${Date.now()}.webp`;
//         await sharp(files.bannerImage[0].buffer)
//             .toFormat("webp")
//             .webp({ quality: 100 })
//             .toFile(`public/img/posts/${req.body.bannerImage}`);
//     }
//     next();
// });
