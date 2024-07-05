import { NextFunction, Request, Response } from "express";
import { Post } from "../model/postModel";
import { User } from "../model/userModel";
import { JwtPayload } from "jsonwebtoken";
import { apiFeatures } from "../utils/apiFeature";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError.js";
import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";

import sharp from "sharp";
import { Like } from "../model/likeModel";
import { Document, model } from "mongoose";
import { filterObjectsForUpdate } from "../utils/filterObject";
import { populate } from "dotenv";
import cloudinarysetup from "../utils/cloudinary";

interface UserPayload {
  id: string;
}

interface IPost extends Document {
  title?: string;
  detail?: string;
  image?: string[] | undefined;

  [key: string]: any;
}
interface RequestWithUser extends Request {
  user: UserPayload;
}
export const getLatestPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.query.sort = "-createAt";
    console.log(
      "getLatestPost middleware - req.query.sort: at latest",
      req.query.sort,
    ); // Debug statement

    next();
  },
);
export const getPopularPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.query.sort = "-likeCount";
    console.log(
      "getLatestPost middleware - req.query.sort: at popular",
      req.query.sort,
    ); // Debug statement

    next();
  },
);

export const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allPostFilter = await apiFeatures(
      Post,
      req,
      "likes author",
      "name  profileImage ",
    );
    const allPost = await allPostFilter;
    console.log(req.query, "query");
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
export const getFriendPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return AppError("please log in", 401);
    }
    console.log(user.id);
    const userLogin = await User.findById(user.id).populate({
      path: "following",
      model: "Follower",
    });
    if (!userLogin) {
      return AppError("Something goes wrong", 404);
    }
    console.log(userLogin, "check userLogin");
    const IDs = (userLogin.following as any).map(
      (follow: any) => follow.followedUser,
    );
    const followingID = IDs.push(user.id);
    console.log(followingID, "followingID");
    req.query.sort = "-createAt";
    const allPostFilter = await apiFeatures(
      Post,
      req,
      "likes author",
      "name  profileImage ",
      IDs,
    );
    const posts = await allPostFilter;
    // const userposts = await Post.find(user.id);
    // console.log(userposts);
    // const getAllPostByUserFollow =

    // console.log(followingID, "followingID");
    res.status(200).json({ data: posts });
  },
);

// export const getAllPost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const allPost = await Post.find()
//     .populate({ path: "author", select: "-posts" })
//     .populate("_id");

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

export const getOnePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    console.log(postId);
    const data = await Post.findById(postId)
      .populate({
        path: "author",
        model: "User",
        select: "-password -joinDate -posts",
        populate: [
          {
            path: "following",
            model: "Follower",
          },
          { path: "followers", model: "Follower" },
        ],
      })
      .populate("likes")
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "user",
          model: "User",
          populate: [
            {
              path: "following",
              model: "Follower",
            },
            { path: "followers", model: "Follower" },
          ],
        },
      });
    res.status(200).json(data);
  },
);
// export interface MulterFiles {
//   image: Express.Multer.File[];
// }

// //!this will save the data to memory
// const multerStorege = multer.memoryStorage();
// const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(AppError("please upload a image file only ", 400), false);
//     return;
//   }
// };
// const upload = multer({
//   storage: multerStorege,
//   fileFilter: multerFilter,
// });
// export const uploadPostImage = upload.fields([{ name: "image", maxCount: 4 }]);
// export const resizePostImage = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const files = req.files as unknown as MulterFiles;
//     console.log(files, "here file check");
//     // Check if files were uploaded
//     if (!files || !files.image) {
//       // No files uploaded, proceed to the next middleware
//       return next();
//     }
//     req.body.image = [];
//     const user = req.user as UserPayload;
//     await Promise.all(
//       files.image.map(async (image: Express.Multer.File, i: number) => {
//         const fileName = `post-${user.id}-${Date.now()}-${uuidv4()}-${
//           i + 1
//         }.webp`;
//         await sharp(files.image[i].buffer)
//           .toFormat("webp")
//           .webp({ quality: 95 })
//           .toFile(`public/img/posts/${fileName}`);
//         req.body.image.push(fileName);
//       }),
//     );
//     console.log(req.body, "add post image");
//     next();
//   },
// );
export const createAPost = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { title, detail, image, imagePublicIds } = req.body;
    console.log(image, "here");
    try {
      if (!req.user) {
        return next(AppError("User not authenticated", 401));
      }
      const user = req.user;

      // Set the author field directly when creating the new Post
      const newPost = await Post.create({
        title,
        detail,
        image,
        imagePublicIds,
        author: user.id,
      });

      // Update the user's posts array with the new post's ID
      await User.findByIdAndUpdate(
        user.id,
        { $push: { posts: newPost.id } },
        // { new: true, useFindAndModify: false }, // options to return the updated document and avoid deprecated method warning
      );

      res.status(200).json({ data: newPost });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
);

export const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const like = await Like.findOne({ post: post.id });
    if (like) {
      await User.findByIdAndUpdate(req.user?.id, {
        $pull: { likePosts: like.id },
      });
    }

    const imagePublicIds = post.imagePublicIds;

    await Like.findByIdAndDelete(post._id);
    await User.findByIdAndUpdate(req.user?.id, {
      $pull: { posts: post._id },
    });

    if (imagePublicIds) {
      if (Array.isArray(imagePublicIds)) {
        // Handle case where imagePublicIds is an array
        await Promise.all(
          imagePublicIds.map(async (publicId) => {
            await cloudinarysetup.uploader.destroy(
              publicId,
              (error, result) => {
                if (error) {
                  console.error("Error deleting image from Cloudinary:", error);
                  return next(error);
                }
                console.log(
                  "Image deleted successfully from Cloudinary:",
                  result,
                );
              },
            );
          }),
        );
      } else {
        // Handle case where imagePublicIds is a single string
        await cloudinarysetup.uploader.destroy(
          imagePublicIds,
          (error, result) => {
            if (error) {
              console.error("Error deleting image from Cloudinary:", error);
              return next(error);
            }
            console.log("Image deleted successfully from Cloudinary:", result);
          },
        );
      }
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Post deleted successfully" });
  },
);

export const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    if (!postId) {
      return next(AppError("no post Id ", 404));
    }
    console.log(req.body);
    if (!req.body.title && !req.body.detail && !req.body.image) {
      return next(AppError("no data to edit ", 404));
    }
    const filterBody = filterObjectsForUpdate(
      req.body,
      "title",
      "detail",
      "image",
    );
    const post = await Post.findById(postId);
    if (!post) {
      return next(AppError("Now post found", 404));
    }
    Object.keys(filterBody).forEach((key: string) => {
      //noted to myself this is how to update the object properie // object.key will create array of from req.body
      (post as unknown as IPost)[key] = req.body[key]; //this will add key and value based on the key in the req.body
    });
    console.log(post);
    post.save({ validateBeforeSave: true });
    res.status(200).json(post);
  },
);
