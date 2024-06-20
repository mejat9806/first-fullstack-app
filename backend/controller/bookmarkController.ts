import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { Bookmark } from "../model/bookMarkModel";
import { AppError } from "../utils/appError";
import { User } from "../model/userModel";

export const getAllBookmarks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(AppError("Please Log in", 401));
    }
    const bookmark = await Bookmark.findOne({
      user: user.id,
    });
    res.status(200).send(bookmark);
  },
);

export const toogleBookmark = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const user = req.user;
    if (!user) {
      return next(AppError("Please Log in", 401));
    }

    const bookmarkExist = await Bookmark.findOne({
      post: postId,
      user: user.id,
    });
    console.log(bookmarkExist, " bookmark exist");
    if (bookmarkExist) {
      console.log("inhere");
      await User.findByIdAndUpdate(user.id, {
        $pull: { bookmark: bookmarkExist.id },
      });
      await Bookmark.findByIdAndDelete(bookmarkExist.id);
      res.status(200).json({
        message: "bookmark Deleted",
      });
    } else {
      const bookmark = await Bookmark.create({
        post: postId,
        user: user.id,
      });
      await User.findByIdAndUpdate(user.id, {
        $push: { bookmark: bookmark.id },
      });
      res.status(200).send(bookmark);
    }
  },
);
