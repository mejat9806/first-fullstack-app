import mongoose, { Model, Mongoose, ObjectId } from "mongoose";

interface CommentType extends Document {
  populate(arg0: { path: string }): unknown;
  user: ObjectId;
  post: ObjectId;
  commentText: string;
  reply: [ObjectId];
  timeStamp: Date;
}
const commentSchema = new mongoose.Schema<CommentType>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  commentText: String,
  reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  timeStamp: { type: Date, default: Date.now() },
});

commentSchema.pre<CommentType>(/^find/, function (next) {
  this.populate({
    path: "reply",
  });
  next();
});
commentSchema.pre<CommentType>(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});
export const Comment: Model<CommentType> = mongoose.model<CommentType>(
  "Comment",
  commentSchema,
);
