import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    commentText: String,
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    timeStamp: { type: Date, default: Date.now() },
});
commentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
    });
    next();
});
commentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "reply",
    });
    next();
});
export const Comment = mongoose.model("Comment", commentSchema);
