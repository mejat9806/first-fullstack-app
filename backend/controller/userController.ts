import { NextFunction, Request, Response } from "express";
import { User } from "../model/userModel";

export const getAlluser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const amountOfDoc = await User.countDocuments();

    const allUser = await User.find();
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
    if (!req.params.id) {
      return res.status(404).json({ message: "No user found." });
    }

    const allUser = await User.findById(req.params.id).populate("posts");
    console.log(allUser);
    res.status(200).json({ data: allUser });
  } catch (error) {
    next();
  }
};