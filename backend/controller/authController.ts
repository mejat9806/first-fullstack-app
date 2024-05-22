import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { User } from "../model/userModel";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import multer from "multer";

import { MulterFiles } from "./postController";
import sharp from "sharp";
dotenv.config();

export const test = (req: Request, res: Response) => {
  res.json({ error: "test is working" });
};
export const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
      return AppError("email is taken", 401);
    }

    const defaultImage = `/public/img/userImage/default.svg`;
    // const hashedPaswords = await hashPaswords(password);
    const user = await User.create({
      name,
      email,
      password,
      image: defaultImage,
    });

    return res.json(user);
  },
);

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(AppError("email and password is required", 401));
    }
    console.log(password);
    const user = await User.findOne({ email });
    if (!user) {
      return next(AppError("User not found", 404));
    }
    //check password matches
    const match = await user.comparePassword(password, user.password);
    if (!match) {
      const err = AppError("please provide correct Email or password  ", 401);
      return next(err);
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
          email: user.email,
          id: user.id,
          name: user.name,
          profileImage: user.profileImage,
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
  },
);
// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.json({ error: "email and password is required" });
//     }
//     console.log(password);
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ error: "user does not exist" });
//     }
//     //check password matches

//     const match = await user.comparePassword(password, user.password);
//     console.log(password, user.password);
//     if (!match) {
//       return res.json({ error: "please check the password" });
//     }
//     if (match) {
//       const accessToken = jwt.sign(
//         { user },
//         process.env.JWT_SECRET_KEY as string,
//         {
//           expiresIn: "10d",
//         },
//       );
//       jwt.sign(
//         {
//           user,
//         },
//         process.env.JWT_SECRET_KEY as string,
//         {},
//         (err, token) => {
//           console.log(token);
//           if (err) throw err;
//           res
//             .cookie("token", token, {
//               maxAge: 24 * 60 * 60 * 100000,
//               httpOnly: true,
//               sameSite: "lax",
//             })
//             .json({ accessToken, user });
//         },
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// Import your User model

// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: "email and password are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "user does not exist" });
//     }

//     // Check password matches
//     const match = await user.comparePassword(password, user.password);
//     if (!match) {
//       return res.status(401).json({ error: "incorrect password" });
//     }

//     // Generate JWT token
//     const accessToken = jwt.sign(
//       { user },
//       process.env.JWT_SECRET_KEY as string,
//       {
//         expiresIn: "10d",
//       },
//     );

//     // Set up cookie
//     jwt.sign(
//       { user },
//       process.env.JWT_SECRET_KEY as string,
//       {},
//       (err, token) => {
//         if (err) {
//           console.error("Error signing JWT token:", err);
//           return res.status(500).json({ error: "internal server error" });
//         }

//         res
//           .cookie("token", token, {
//             maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
//             httpOnly: true,
//             sameSite: "lax",
//           })
//           .json({ accessToken, user });
//       },
//     );
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "internal server error" });
//   }
// };

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

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(AppError("please upload a image file only ", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadUserPhoto = upload.single("profileImage");
export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file, "here");
    if (!req.user) {
      return next(AppError("please login", 401));
    }
    const files = req.files as unknown as MulterFiles;
    console.log(files, "here file check");

    if (!req.file) {
      // No files uploaded, proceed to the next middleware
      return next();
    }
    req.body.filename = `user=${req.user.id}-${Date.now()}.webp`;
    await sharp(req.file.buffer)
      .toFormat("webp")
      .webp({ quality: 80 })
      .toFile(`public/img/posts/${req.body.filename}`);
    next();
  },
);

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.name < 5) {
      return next(AppError("Invalid username need atleast 5 characters", 401));
    }
    console.log(req.body.filename, "file name here");
    const filterBody = filterObjectsForUpdateUser(req.body, "name", "email");
    if (req.file) {
      filterBody.profileImage = req.body.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user?.id, filterBody, {
      new: true,
      runValidators: true,
    });
    console.log(updatedUser);
    res.status(200).json({
      updatedUser,
    });
  },
);
export const getProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    if (!req.user) {
      return next(AppError("Please log in again", 401));
    }
    res.json(req.user);
  },
);
