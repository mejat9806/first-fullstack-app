import { Comment } from "../model/commentModel";
import { Post } from "../model/postModel";
import { Reply } from "../model/replyModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export const replyToComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;
    console.log(postId, commentId);
    console.log(req.body, "body here");
    const user = req.user;
    if (!user) {
      return next(AppError("Please Log in", 401));
    }
    // const reply = await Reply.findO({ commentId: commentId });
    // console.log(reply, "reply");
    // if (!reply) {
    //   return next(AppError("no comment found", 404));
    // }
    const replyToReply = await Reply.findOne({
      _id: commentId,
    });
    console.log(commentId);
    console.log(replyToReply, "reply to reply");
    if (replyToReply) {
      console.log(replyToReply);
      const reply = await Reply.create({
        user: user.id,
        post: postId,
        commentId,
        commentText: req.body.text,
      });
      const replytoReply = await Reply.findByIdAndUpdate(commentId, {
        $push: { reply: reply.id },
      });
      res.status(200).send({ replytoReply });
    } else {
      const reply = await Reply.create({
        commentText: req.body.text,
        user: user.id,
        commentId,
        post: postId,
      });
      const replywithUpdate = await Reply.findByIdAndUpdate(reply.id, {
        user: user.id,
        commentId: commentId,
      });
      const comment = await Comment.findByIdAndUpdate(commentId, {
        $push: { reply: reply.id },
      });
      console.log(comment);
      res.status(200).json(replywithUpdate);
    }
  },
);

export const getAreply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { replyId } = req.params;
    console.log("here");

    const reply = await Reply.findById(replyId);
    res.status(200).json(reply);
  },
);
