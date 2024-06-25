import { NextFunction, Request, Response } from "express";
import { User } from "../model/userModel.js";
import { model } from "mongoose";
import { populate } from "dotenv";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import { Follower } from "../model/followerModel.js";

export const getAlluser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const amountOfDoc = await User.countDocuments();

    const allUser = await User.find().populate("posts");
    if (!allUser) {
      return res.status(404).json({ message: "No user found." });
    }
    res.status(200).json({ amountOfDoc, data: allUser });
  },
);

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorId = req.params.id;
    console.log(authorId);
    if (!authorId) {
      return res.status(404).json({ message: "No user found." });
    }

    const user = await User.findById(authorId).populate({
      path: "likePosts",
      model: "Like",
      select: "-user",
      populate: {
        path: "post",
        model: "Post",
        populate: {
          path: "author",
          model: "User",
          select: "-password -joinDate -posts",
        },
      },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    next();
  }
};

export const followFnc = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    console.log(userId, "user id to folloer");
    if (!req.user) {
      return next(AppError("please log in ", 401));
    }
    const userWantToFollow = await User.findById(userId);
    console.log(userWantToFollow, "userWantToFollow");
    if (!userWantToFollow) {
      return next(AppError("User not found", 404));
    }

    if (userWantToFollow.id === req.user?.id) {
      return next(AppError("you cant follow yourself", 404));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(AppError("please log in ", 401));
    }

    const hasFollowed = await Follower.findOne({
      followedUser: userId,
      user: req.user.id,
    });
    if (hasFollowed) {
      console.log(hasFollowed.id, "has follow");
      const deleteFollow = await Follower.findByIdAndDelete(hasFollowed.id);
      await User.findByIdAndUpdate(userId, { $inc: { followerCount: -1 } });
      await User.findByIdAndUpdate(user.id, { $inc: { followCount: -1 } });
      console.log("unfollow");
      res.status(200).json("delete follow");
    } else {
      console.log(hasFollowed, "here");
      const follow = await Follower.create({
        followedUser: userId,
        user: user.id,
      });
      await User.findByIdAndUpdate(userId, { $inc: { followerCount: 1 } });
      await User.findByIdAndUpdate(user.id, { $inc: { followCount: 1 } });
      res.status(200).json(follow);
    }

    // const addUserToFollow = await User.findByIdAndUpdate(req.user.id, {
    //   $push: { follow: userId },
    // });
    // const addUserToFollower = await User.findByIdAndUpdate(userId, {
    //   $push: { follower: user.id },
    // });
  },
);
