import mongoose from "mongoose";
const replySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    commentText: String,
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    timeStamp: { type: Date, default: Date.now() },
});
replySchema.pre(/^find/, function (next) {
    console.log("Middleware triggered!111");
    this.populate({
        path: "user",
    });
    next();
});
replySchema.pre(/^find/, function (next) {
    console.log("Middleware triggered!");
    this.populate({
        path: "reply",
    });
    next();
});
export const Reply = mongoose.model("Reply", replySchema);
