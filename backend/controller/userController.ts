import { NextFunction, Request, Response } from "express";
import { User } from "../model/userModel.js";

export const getAlluser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const amountOfDoc = await User.countDocuments();

    const allUser = await User.find().populate("posts");
    if (!allUser) {
      return res.status(404).json({ message: "No user found." });
    }
    res.status(200).json({ amountOfDoc, data: allUser });
  } catch (error) {}
};

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

    const user = await User.findById(authorId).populate("posts");
    console.log(user);
    res.status(200).json({ data: user });
  } catch (error) {
    next();
  }
};
