import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { User } from "../model/userModel";
dotenv.config();

export const test = (req: Request, res: Response) => {
  res.json({ error: "test is working" });
};
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(name);
    //check if name .password and email was entered
    if (!name) {
      return res.json({ error: "name is required" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: `password is required and should be atleast 6 characters long`,
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "email is already taken " });
    }

    // const hashedPaswords = await hashPaswords(password);
    const user = await User.create({ name, email, password });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ error: "email and password is required" });
    }
    console.log(password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "user does not exist" });
    }
    //check password matches

    const match = await user.comparePassword(password, user.password);

    if (!match) {
      return res.json({ error: "please check the password" });
    }
    if (match) {
      const accessToken = jwt.sign(
        { user },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "10d",
        },
      );
      jwt.sign(
        {
          user,
        },
        process.env.JWT_SECRET_KEY as string,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: "lax",
            })
            .json({ accessToken, user });
        },
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = (req: Request, res: Response) => {
  const { token } = req.cookies; //nned to have the same name as the token used
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

export const logout = (req: Request, res: Response) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) return res.status(204);
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, //https
    sameSite: "lax", //cross site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ message: "send" });
};

function filterObjectsForUpdateUser(
  reqBodyObject: any,
  ...allowedFields: string[]
) {
  const newObjects: { [key: string]: any } = {};
  Object.keys(reqBodyObject).forEach((key) => {
    if (allowedFields.includes(key)) {
      newObjects[key] = reqBodyObject[key];
    }
  });
  return newObjects;
}

export const updateMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filterBody = filterObjectsForUpdateUser(req.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate();
};
