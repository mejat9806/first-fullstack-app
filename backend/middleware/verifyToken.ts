import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user:
        | JwtPayload
        | {
            email: string;
            id: string;
            name: string;
            profileImage: string;
            iat: number;
          }
        | undefined; // Adjust the type as needed
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
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return next(
      res
        .status(401)
        .json("You are not logged in! Please log in to get access."),
    );
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    (err: any, decode: any) => {
      if (err) {
        return res
          .status(401)
          .json("You are not logged in! Please log in to get access.");
      }
      req.user = decode;
      next();
    },
  );
};
