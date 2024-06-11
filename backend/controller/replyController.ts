import { Comment } from "../model/commentModel";
import { Post } from "../model/postModel";
import { Reply } from "../model/replyModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export const replyToComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;
    console.log(req.body);
    const user = req.user;
    if (!user) {
      return next(AppError("Please Log in", 401));
    }
    const post = await Post.findById(postId);

    if (!post) {
      return next(AppError("no post found", 404));
    }

    const replyToReply = await Reply.findById(commentId);

    if (replyToReply) {
      console.log(replyToReply);
      const reply = await Reply.create({
        text: req.body.text,
      });
      const replytoReply = await Reply.findByIdAndUpdate(commentId, {
        $push: { user: user.id, commentId: commentId, reply: reply.id },
      });
      console.log("reply to reply");
      res.status(200).send({ replytoReply });
    } else {
      const reply = await Reply.create({
        text: req.body.text,
      });
      const replywithUpdate = await Reply.findByIdAndUpdate(reply.id, {
        $push: { user: user.id, commentId: commentId },
      });
      const comment = await Comment.findByIdAndUpdate(commentId, {
        $push: { reply: reply.id },
      });
      res.status(200).json(replywithUpdate);
    }
  },
);
