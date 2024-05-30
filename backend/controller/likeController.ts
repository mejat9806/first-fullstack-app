import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { Like } from "../model/likeModel";
import { Post } from "../model/postModel";
import { User } from "../model/userModel";

export const likePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(AppError("please log in ", 401));
    }
    const { postId } = req.params;
    const isLikeAlready = await Like.findOne({ user: req.user.id });
    if (isLikeAlready) {
      return next(AppError("you already like this", 401));
    }
    const likePost = await Like.create({
      user: req.user.id,
      post: postId,
    });
    await Post.findByIdAndUpdate(postId, {
      $push: { likes: likePost._id },
      $inc: { likesCount: 1 },
    });
    const post = await Post.findById(postId)
      .populate("author")
      .populate("likes");
    res.status(200).json(post);
  },
);

export const dislike = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
