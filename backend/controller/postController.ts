import { NextFunction, Request, Response } from "express";
import { Post } from "../model/postModel";
import { User } from "../model/userModel";
import { JwtPayload } from "jsonwebtoken";
import { apiFeatures } from "../utils/apiFeature";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";

import sharp from "sharp";
interface UserPayload {
  id: string;
  // Add any other properties you expect on the user object
}

interface RequestWithUser extends Request {
  user: UserPayload;
}

export const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allPostFilter = await apiFeatures(
      Post,
      req,
      "author",
      "name  profileImage ",
    );
    const allPost = await allPostFilter;

    allPost.forEach((post: { author: any }) => {
      // this will loop through and delete the posts array from the author array
      if (post.author && (post.author as any).posts) {
        delete (post.author as any).posts;
      }
    });
    res.status(200).json({
      data: allPost,
    });
  },
);
// export const getAllPost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const allPost = await Post.find()
//     .populate({
//       path: "author",
//       select: "name email profileImage active",
//     })
//     .lean();
//   allPost.forEach((post) => {
//     // this will loop through and delete the posts array from the author array
//     if (post.author && (post.author as any).posts) {
//       delete (post.author as any).posts;
//     }
//   });
//   res.status(200).json({
//     data: allPost,
//   });
// };
interface MulterFiles {
  image: Express.Multer.File[];
}

//!this will save the data to memory
const multerStorege = multer.memoryStorage();
const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(AppError("please upload a image file only ", 400), false);
  }
};
const upload = multer({ storage: multerStorege, fileFilter: multerFilter });
export const uploadPostImage = upload.fields([
  { name: "image", maxCount: 100 },
]);

export const resizePostImage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as unknown as MulterFiles;

    if (!files) {
      return next();
    }
    console.log(files);
    req.body.image = [];
    const user = req.user as UserPayload;
    await Promise.all(
      files.image.map(async (image: Express.Multer.File, i: number) => {
        const fileName = `post-${user.id}-${Date.now()}-${uuidv4()}-${
          i + 1
        }.jpeg`;
        await sharp(files.image[i].buffer)
          .resize(2000, 1300, { fit: "cover" })
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/posts/${fileName}`);
        req.body.image.push(fileName);
      }),
    );
    // console.log(req.body, "add post image");
    next();
  },
);
export const createAPost = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      if (!req.user) {
        return next(AppError("User not authenticated", 401));
      }
      const user = req.user;
      req.body.author = user.id;
      console.log(req.user);
      // Create new Post document
      const newPost = await Post.create(req.body);
      await User.findByIdAndUpdate(
        req.body.author.id,
        { $push: { posts: newPost._id } },
        // { new: true, useFindAndModify: false }, // options to return the updated document and avoid deprecated method warning
      );

      // Send response with the new Post
      res.status(200).json({ data: newPost });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error });
    }
  },
);
