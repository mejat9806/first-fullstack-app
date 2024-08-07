import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { catchAsync } from "./catchAsync";
import { AppError } from "./appError";
import cloudinary from "./cloudinary";

export interface MulterFiles {
  image: Express.Multer.File[];
}
interface UserPayload {
  id: string;
}
interface RequestWithUser extends Request {
  user: UserPayload;
}

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(AppError("Please upload an image file only", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadPostImage = upload.fields([{ name: "image", maxCount: 4 }]);

export const resizePostImage = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const files = req.files as unknown as MulterFiles;
    if (!files || !files.image) {
      return next();
    }
    req.body.image = [];
    req.body.imagePublicIds = [];

    await Promise.all(
      files.image.map(async (image: Express.Multer.File, i: number) => {
        const fileName = `post-${req.user.id}-${Date.now()}-${uuidv4()}-${
          i + 1
        }.webp`;

        const buffer = await sharp(image.buffer)
          .toFormat("webp")
          .webp({ quality: 95 })
          .toBuffer();

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { public_id: fileName, resource_type: "image" },
              (error, result) => {
                if (error) {
                  console.error("Cloudinary upload error: ", error);
                  return reject(AppError("Image upload failed", 500));
                }

                req.body.image.push(result?.secure_url);
                req.body.imagePublicIds.push(result?.public_id);
                console.log(req.body);
                resolve(result);
              },
            )
            .end(buffer);
        });

        return uploadResult;
      }),
    );
    next();
  },
);
