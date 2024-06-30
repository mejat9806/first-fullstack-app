import jwt from "jsonwebtoken";
import { Response } from "express";
import { HttpStatusCode } from "axios";
export const signToken = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "15m",
    },
  );
  return token;
};
const signRefreshToken = (user: any) => {
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_JWT_SECRET as string,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    },
  );
  return refreshToken;
};
export const createSendToken = (
  user: any,
  statusCode: HttpStatusCode,
  res: Response,
) => {
  const refreshCookieExpiresIn = process.env
    .REFRESH_JWT_COOKIES_EXPIRES_IN as unknown as number;
  const accessToken = signToken(user);
  const refreshToken = signRefreshToken(user._id);
  res.cookie("token", accessToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    // sameSite: "lax",
  });
  res.cookie("refreshToken", refreshToken, {
    expires: new Date(
      Date.now() + refreshCookieExpiresIn * 24 * 60 * 60 * 1000,
    ),
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    // sameSite: "none",
  });
  res.status(statusCode).json({
    accessToken,
    refreshToken,
    user,
  });
};
