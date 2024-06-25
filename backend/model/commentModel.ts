import mongoose, { Model, Mongoose, ObjectId } from "mongoose";

interface CommentType extends Document {
  populate(arg0: { path: string }): unknown;
  user: ObjectId;
  post: ObjectId;
  commentText: string;
  reply: [ObjectId];
  timeStamp: Date;
  commentId: String;
}
const commentSchema = new mongoose.Schema<CommentType>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  commentText: String,
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  timeStamp: { type: Date, default: Date.now() },
});

commentSchema.pre<CommentType>(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

commentSchema.pre<CommentType>(/^find/, function (next) {
  this.populate({
    path: "reply",
  });
  next();
});
export const Comment: Model<CommentType> = mongoose.model<CommentType>(
  "Comment",
  commentSchema,
);
