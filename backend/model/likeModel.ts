import mongoose, { Model } from "mongoose";

interface likeType {
  likes: number;
  user: mongoose.Schema.Types.ObjectId;
  post: mongoose.Schema.Types.ObjectId;
}

const likeSchema = new mongoose.Schema<likeType>({
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

likeSchema.statics.calculateLikesNum = async function (postId) {
  const stats = await this.aggregate([
    {
      $match: { post: postId }, //this will only return the data that matches the postId
    },
    {
      $group: {
        _id: "$post", // make a group by an id
        nLikes: { $sum: 1 }, //increase the
      },
    },
  ]);
  if (stats.length > 0) {
    await Like.findByIdAndUpdate(postId, {
      likes: stats[0].nLikes,
    });
  }
};
export const Like: Model<likeType> = mongoose.model<likeType>(
  "Like",
  likeSchema,
);
