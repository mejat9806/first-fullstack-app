import mongoose from "mongoose";
import slugify from "slugify";
const postSchema = new mongoose.Schema({
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
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    createAt: {
        type: Date,
        default: Date.now,
    },
    likesCount: { type: "number", default: 0 },
    slug: { type: "string" },
    image: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    lastUpdate: Date,
    updated: { type: Boolean, default: false },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
postSchema.pre("save", function (next) {
    if (!this.isModified("title") && !this.isModified("detail") && this.isNew) {
        console.log("edit", !this.isModified("title"), !this.isModified("detail"), this.isNew);
        return next();
    }
    this.lastUpdate = new Date(Date.now() - 1000);
    this.updated = true;
    next();
});
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
export const Post = mongoose.model("Post", postSchema);
