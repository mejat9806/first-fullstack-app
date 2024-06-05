import mongoose, { Model, Query } from "mongoose";
import { Post } from "./postModel";

interface likeType {
  likes: number;
  user: mongoose.Schema.Types.ObjectId;
  post: mongoose.Schema.Types.ObjectId;
}

const likeSchema = new mongoose.Schema<likeType>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

// likeSchema.statics.calculateLikesNum = async function (postId) {
//   //this need to be called like this on controllers await Like.calculateLikesNum(postId);
//   console.log("here");
//   const stats = await this.aggregate([
//     {
//       $match: { post: postId }, //this will only return the data that matches the postId
//     },
//     {
//       $group: {
//         _id: "$post", // make a group by an id
//         nLikes: { $sum: 1 }, //increase the
//       },
//     },
//   ]);
//   if (stats.length > 0) {
//     await Post.findByIdAndUpdate(postId, {
//       likes: stats[0].nLikes,
//     });
//   }
// };
// likeSchema.pre<Query<any, likeType>>(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     model: "User",
//   });
//   next();
// });
// likeSchema.pre<Query<any, likeType>>(/^find/, function (next) {
//   this.populate({
//     path: "post",
//     model: "Post",
//   });
//   next();
// });

export const Like: Model<likeType> = mongoose.model<likeType>(
  "Like",
  likeSchema,
);
