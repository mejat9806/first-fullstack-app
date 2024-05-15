import { NextFunction, Request, Response } from "express";
import { Post } from "../model/postModel";
import { User } from "../model/userModel";
import { JwtPayload } from "jsonwebtoken";
import { apiFeatures } from "../utils/apiFeature";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";

interface RequestWithUser {
  user:
    | {
        id: string;
        // Add any other properties you expect on the user object
      }
    | JwtPayload;
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

export const createAPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      if (!req.user) {
        return next(AppError("User not authenticated", 401));
      }

      const user = req.user;
      console.log(user);
      req.body.author = user;
      // Create new Post document
      const newPost = await Post.create(req.body);
      // Find the User by ID and update the posts array
      await User.findByIdAndUpdate(
        user,
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
