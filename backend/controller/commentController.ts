import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { Comment } from "../model/commentModel";
import { AppError } from "../utils/appError";
import { Post } from "../model/postModel";
import he from "he";
export const GetAllComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const comment = await Comment.findOne({ post: postId });
    res.status(200).json({ comment });
  },
);
export const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let { commentText } = req.body;
    console.log(req.body);
    console.log(commentText);
    const { postId } = req.params;
    commentText = he.decode(commentText);

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
  },
);
