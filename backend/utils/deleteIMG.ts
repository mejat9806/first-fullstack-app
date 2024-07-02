import { Request, Response, NextFunction } from "express";

import cloudinarysetup from "./cloudinarysetup";
import { catchAsync } from "./catchAsync";
import { AppError } from "./appError";
import { Post } from "../model/postModel";
import { Like } from "../model/likeModel";
import { User } from "../model/userModel";

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

    if (Array.isArray(imagePublicIds)) {
      await Promise.all(
        imagePublicIds.map(async (publicId) => {
          await cloudinarysetup.uploader.destroy(publicId, (error, result) => {
            if (error) {
              console.error("Error deleting image from Cloudinary:", error);
              return next(error);
            }
            console.log("Image deleted successfully from Cloudinary:", result);
          });
        }),
      );
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Post deleted successfully" });
  },
);

// import { NextFunction } from "express";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// export function deleteImage(imagePath: string, next: NextFunction) {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);
//   console.log(imagePath, "in delete Image function");
//   const fullImagePath = path.join(
//     __dirname,
//     "..",
//     "public",
//     "img",
//     "posts",
//     imagePath,
//   );
//   console.log(fullImagePath, "full path here");
//   fs.unlink(fullImagePath, (err) => {
//     if (err) {
//       console.error("Error deleting image file:", err);
//       return next(err);
//     }
//     console.log("Image file deleted successfully:", fullImagePath);
//   });
// }
