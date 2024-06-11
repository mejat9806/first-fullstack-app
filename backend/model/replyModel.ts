import mongoose, { Model } from "mongoose";

interface ReplyType {
  commentId: mongoose.Schema.Types.ObjectId;
  text: string;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const replySchema = new mongoose.Schema<ReplyType>({
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  text: String,
  createdAt: Date.now(),
});
export const Reply: Model<ReplyType> = mongoose.model<ReplyType>(
  "Reply",
  replySchema,
);
