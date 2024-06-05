import mongoose, { Document, Model, Schema } from "mongoose";

import { User, UserType } from "./userModel";
import { catchAsync } from "../utils/catchAsync";
import slugify from "slugify";

interface PostType extends Document {
  title: string;
  detail: string;
  author: mongoose.Schema.Types.ObjectId;
  createAt: Date;
  slug: string;
  image: string;
  _doc?: any;
  likes: mongoose.Schema.Types.ObjectId[];
  likesCount: number;
}
const postSchema = new mongoose.Schema<PostType>(
  {
    title: {
      type: "string",
      required: [true, "must have a tittle"],
    },
    detail: {
      type: "string",
      // required: [true, "must have a post detail"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    createAt: {
      type: Date,
      default: Date.now,
    },
    slug: { type: "string" },
    image: [String],
    likesCount: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  },

  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);
postSchema.pre("save", function (next) {
  this.slug = slugify(`${this.title}-${this._id}`, { lower: true });
  next();
});

// postSchema.pre<UserType>(/^find/, function (next) {
//   console.log("Middleware triggered!");

//   this.populate({
//     path: "author",
//   });
//   next();
// });
// postSchema.statics.calcPost = async function (userId) {
//   const numPosts = await this.aggregate([
//     {
//       $match: { author: userId },
//     },
//     {
//       $count: "totalPosts",
//     },
//   ]);
//   return numPosts.length > 0 ? numPosts[0].totalPosts : 0;
// };

// postSchema.post("save", async function (doc: PostType) {
//   await this.constructor.calcPost(doc.author);
// });

export const Post: Model<PostType> = mongoose.model<PostType>(
  "Post",
  postSchema,
);
