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
    createAt: {
        type: Date,
        default: Date.now,
    },
    slug: { type: "string" },
    image: [String],
    likes: { type: "Number", default: 0 },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
postSchema.pre("save", function (next) {
    this.slug = slugify(`${this.title}-${this._id}`, { lower: true });
    next();
});
postSchema.pre(/^find/, function (next) {
    this.populate({
        path: "posts",
        strictPopulate: false,
    });
    next();
});
postSchema.statics.calcPost = async function (userId) {
    const numPosts = await this.aggregate([
        {
            $match: { author: userId },
        },
        {
            $count: "totalPosts",
        },
    ]);
    return numPosts.length > 0 ? numPosts[0].totalPosts : 0;
};
// postSchema.post("save", async function (doc: PostType) {
//   await this.constructor.calcPost(doc.author);
// });
export const Post = mongoose.model("Post", postSchema);
