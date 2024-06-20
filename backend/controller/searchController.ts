import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

export const search = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {
    const searchData = {
      user: "amer",
      age: 26,
    };
    res.status(200).json(searchData);
  },
);
