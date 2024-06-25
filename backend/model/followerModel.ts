import mongoose, { Model } from "mongoose";
export interface FollowType extends Document {
  user: mongoose.Schema.Types.ObjectId;
  followedUser: mongoose.Schema.Types.ObjectId;
}
const followSchema = new mongoose.Schema<FollowType>(
  {
    followedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Follower: Model<FollowType> = mongoose.model<FollowType>(
  "Follower",
  followSchema,
);
