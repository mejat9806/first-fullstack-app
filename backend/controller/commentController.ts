import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { Comment } from "../model/commentModel";
import { AppError } from "../utils/appError";
import { Post } from "../model/postModel";

export const GetAllComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const comment = await Comment.findOne({ post: postId });
    res.status(200).json({ message: "work", postId });
  },
);
export const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { postId } = req.params;

    if (!user) {
      return next(AppError("Please Log in ", 401));
    }
    const comment = await Comment.create({
      commentText: req.body.commentText,
      post: postId,
      user: user.id,
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment.id },
    });
    res.status(200).json({ data: comment });
  },
);

export const replyToComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;

    res.status(200).json({ postId, commentId });
  },
);
