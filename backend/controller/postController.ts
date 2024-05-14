import { NextFunction, Request, Response } from "express";
import { Post } from "../model/postModel";
import { User } from "../model/userModel";
import { JwtPayload } from "jsonwebtoken";

interface RequestWithUser {
  user:
    | {
        id: string;
        // Add any other properties you expect on the user object
      }
    | JwtPayload;
}

export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const allPost = await Post.find()
    .populate({
      path: "author",
      select: "name email profileImage active", // Specify the fields you want to include
    })
    .lean();
  allPost.forEach((post) => {
    // this will loop through and delete the posts array from the author array
    if (post.author && (post.author as any).posts) {
      delete (post.author as any).posts;
    }
  });
  res.status(200).json({
    data: allPost,
  });
};
export const getAPostByAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const allPost = await Post.find();
  res.status(200).json({
    data: allPost,
  });
};

export const createAPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = req.user;
    console.log(user);
    req.body.author = user;
    // Create new Post document
    const newPost = await Post.create(req.body);
    // Find the User by ID and update the posts array
    await User.findByIdAndUpdate(
      user,
      { $push: { posts: newPost._id } },
      // { new: true, useFindAndModify: false }, // options to return the updated document and avoid deprecated method warning
    );

    // Send response with the new Post
    res.status(200).json({ data: newPost });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error });
  }
};
