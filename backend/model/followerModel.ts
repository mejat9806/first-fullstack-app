import mongoose, { Model, Query } from "mongoose";
export interface FollowType extends Document {
  user: mongoose.Schema.Types.ObjectId;
  followedUser: mongoose.Schema.Types.ObjectId;
}
const followSchema = new mongoose.Schema<FollowType>(
  {
    followedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Follower: Model<FollowType> = mongoose.model<FollowType>(
  "Follower",
  followSchema,
);
