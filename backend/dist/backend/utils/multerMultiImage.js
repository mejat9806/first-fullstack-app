import multer from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
// Adjust the path as necessary
import { catchAsync } from "./catchAsync";
import { AppError } from "./appError";
import cloudinarysetup from "./cloudinary";
const multerStorege = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(AppError("please upload a image file only ", 400), false);
        return;
    }
};
const upload = multer({
    storage: multerStorege,
    fileFilter: multerFilter,
});
export const uploadPostImage = upload.fields([{ name: "image", maxCount: 4 }]);
export const resizePostImage = catchAsync(async (req, res, next) => {
    const files = req.files;
    console.log(files, "here file check");
    // Check if files were uploaded
    if (!files || !files.image) {
        // No files uploaded, proceed to the next middleware
        return next();
    }
    req.body.image = [];
    const user = req.user;
    await Promise.all(files.image.map(async (image, i) => {
        const fileName = `post-${user.id}-${Date.now()}-${uuidv4()}-${i + 1}.webp`;
        const buffer = await sharp(image.buffer)
            .toFormat("webp")
            .webp({ quality: 95 })
            .toBuffer();
        const uploadResult = new Promise((resolve, reject) => {
            cloudinarysetup.uploader
                .upload_stream({ public_id: fileName, resource_type: "image" }, (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error: ", error);
                    return reject(AppError("Image upload failed", 500));
                }
                req.body.image.push(result?.secure_url);
                resolve(result?.secure_url);
            })
                .end(buffer);
        });
        await uploadResult;
    }));
    console.log(req.body, "add post image");
    next();
});
