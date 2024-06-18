import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { User } from "../model/userModel";

declare global {
  //this is used to modify the global TS Scope
  namespace Express {
    //this is used to select express to edit
    interface Request {
      //this is used to add new properties
      user:
        | JwtPayload //this is from jsonwebtoken
        | {
            email: string; //this is the jsonwebtoken data we want
            id: string;
            name: string;
            profileImage: string;
            iat: number;
          }
        | undefined;
    }
  }
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (
    (req.headers.Authorization || req.headers.Authorization) &&
    (
      (req.headers.Authorization || req.headers.Authorization) as string
    ).startsWith("Bearer")
  ) {
    token = (
      (req.headers.Authorization || req.headers.Authorization) as string
    ).split(" ")[1];
  } else if (req.cookies.refreshToken) {
    token = req.cookies.refreshToken;
  }
  console.log(req.cookies.refreshToken, "cookies");
  if (!token) {
    console.log("token no detected");
    return next(
      res
        .status(401)
        .json("You are not logged in! Please log in to get access."),
    );
  }
  jwt.verify(
    token,
    process.env.REFRESH_JWT_SECRET as string,
    (err: any, decode: any) => {
      if (err) {
        return res
          .status(401)
          .json("You are not logged in! Please log in to get access.");
      }
      req.user = decode;
      console.log("token no detected");

      console.log(req.user);
      next();
    },
  );
};
