import { catchAsync } from "../utils/catchAsync";
import { Comment } from "../model/commentModel";
import { AppError } from "../utils/appError";
import { Post } from "../model/postModel";
import he from "he";
export const GetAllComment = catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    const comment = await Comment.findOne({ post: postId });
    res.status(200).json({ comment });
});
export const getAComment = catchAsync(async (req, res, next) => {
    const { commentId } = req.params;
    console.log(commentId);
    const comment = await Comment.findOne({ _id: commentId });
    res.status(200).json(comment);
});
export const createComment = catchAsync(async (req, res, next) => {
    const user = req.user;
    let { commentText } = req.body;
    console.log(req.body);
    console.log(commentText);
    const { postId } = req.params;
    commentText = he.decode(commentText);
    const post = await Post.findById(postId);
    if (!post) {
        return next(AppError("There is no Post ", 401));
    }
    if (!user) {
        return next(AppError("Please Log in ", 401));
    }
    console.log(commentText, "here");
    const comment = await Comment.create({
        commentText,
        post: postId,
        user: user.id,
    });
    await Post.findByIdAndUpdate(postId, {
        $push: { comments: comment.id },
    });
    res.status(200).json({ data: comment });
});
export const replyToComment = catchAsync(async (req, res, next) => {
    const { postId, commentId } = req.params;
    console.log(postId, commentId);
    console.log(req.body.commentText, "body here");
    const user = req.user;
    if (!user) {
        return next(AppError("Please Log in", 401));
    }
    // const reply = await Reply.findO({ commentId: commentId });
    // console.log(reply, "reply");
    // if (!reply) {
    //   return next(AppError("no comment found", 404));
    // }
    const replyToReply = await Comment.findOne({
        _id: commentId,
    });
    console.log(commentId);
    console.log(replyToReply, "reply to reply");
    if (replyToReply) {
        console.log(replyToReply);
        const reply = await Comment.create({
            user: user.id,
            post: postId,
            commentText: req.body.commentText,
            commentId: commentId,
        });
        const replytoReply = await Comment.findByIdAndUpdate(commentId, {
            $push: { reply: reply.id },
        });
        res.status(200).send({ replytoReply });
    }
    else {
        const reply = await Comment.create({
            commentText: req.body.commentText,
            user: user.id,
            commentId: commentId,
            post: postId,
        });
        const replywithUpdate = await Comment.findByIdAndUpdate(reply.id, {
            user: user.id,
            commentId: commentId,
            $push: { reply: reply.id },
        });
        res.status(200).json(replywithUpdate);
    }
});
