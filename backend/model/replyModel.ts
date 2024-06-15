import mongoose, { Model } from "mongoose";

interface ReplyType {
  populate: any;
  commentId: mongoose.Schema.Types.ObjectId;
  text: string;
  user: mongoose.Schema.Types.ObjectId;
  reply: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

const replySchema = new mongoose.Schema<ReplyType>({
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  createdAt: { type: Date, default: Date.now() },
});

replySchema.pre(/^find/, function (next) {
  console.log("Middleware triggered!");

  this.populate({
    path: "user",
  });
  next();
});
export const Reply: Model<ReplyType> = mongoose.model<ReplyType>(
  "Reply",
  replySchema,
);
