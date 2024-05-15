// import { NextFunction, Request, Response } from "express";
// import { Post } from "../model/postModel";
// import { apiFeatures } from "../utils/apiFeature";

// export const getAllPost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const feature = await apiFeatures(Post, req);
//   const allPost = await feature;

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
//     message: "work",
//   });
// };
