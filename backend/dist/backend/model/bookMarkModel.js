import mongoose from "mongoose";
const bookMarkSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createAt: {
        type: Date,
        default: Date.now,
    },
});
bookMarkSchema.pre(/^find/, function (next) {
    this.populate({
        path: "post",
        model: "Post",
    });
    next();
});
// bookMarkSchema.pre<Query<any, bookMarkType>>(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     model: "User",
//   });
//   next();
// });
export const Bookmark = mongoose.model("BookMark", bookMarkSchema);
