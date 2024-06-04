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
    const existingLike = await Like.findOne({
      //this will get the the existing like
      user: req.user.id,
      post: postId,
    });

    if (existingLike) {
      //if the is already like for this post delete the like and
      const likePost = await Like.findByIdAndDelete(existingLike.id); //delete the existing like
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: existingLike._id },
        $inc: { likesCount: -1 },
      }); //this will update the
      //then get the updated post and send it to the user
      res.status(200).json({ message: " like remove", likePost });
    } else {
      //if there is no like post create new like poast
      const likePost = await Like.create({
        user: req.user.id,
        post: postId,
      });
      await Post.findByIdAndUpdate(postId, {
        $push: { likes: likePost._id },
        $inc: { likesCount: 1 },
      });

      res.status(200).json({ message: " like added", likePost });
    }
  },
);

export const getLike = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const like = await Like.find();
    res.status(200).json(like);
  },
);
