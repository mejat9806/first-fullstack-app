import mongoose, { Model, Mongoose, ObjectId } from "mongoose";

interface CommentType extends Document {
  user: ObjectId;
  post: ObjectId;
  commentText: string;
  reply: [ObjectId];
  timeStamp: Date;
}
const commentSchema = new mongoose.Schema<CommentType>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  commentText: { type: String },
  reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  timeStamp: { type: Date, default: Date.now() },
});

export const Comment: Model<CommentType> = mongoose.model<CommentType>(
  "Comment",
  commentSchema,
);
