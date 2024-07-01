import jwt from "jsonwebtoken";
export const signToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15m",
    },
  );
  return token;
};
const signRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    },
  );
  return refreshToken;
};
export const createSendToken = (user, statusCode, res) => {
  const refreshCookieExpiresIn = process.env.REFRESH_JWT_COOKIES_EXPIRES_IN;
  const accessToken = signToken(user);
  const refreshToken = signRefreshToken(user._id);
  res.cookie("token", accessToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    // sameSite: "strict",
    sameSite: "none",
  });
  res.cookie("refreshToken", refreshToken, {
    expires: new Date(
      Date.now() + refreshCookieExpiresIn * 24 * 60 * 60 * 1000,
    ),
    secure: true,
    httpOnly: true,
    // sameSite: "strict",
    sameSite: "none",
  });
  res.status(statusCode).json({
    accessToken,
    refreshToken,
    user,
  });
};
