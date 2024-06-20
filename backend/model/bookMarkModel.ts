import mongoose, { Model, Query } from "mongoose";

interface bookMarkType {
  post: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  createAt: Date;
}

const bookMarkSchema = new mongoose.Schema<bookMarkType>({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

bookMarkSchema.pre<Query<any, bookMarkType>>(/^find/, function (next) {
  this.populate({
    path: "post",
    model: "Post",
  });
  next();
});
export const Bookmark: Model<bookMarkType> = mongoose.model<bookMarkType>(
  "BookMark",
  bookMarkSchema,
);
