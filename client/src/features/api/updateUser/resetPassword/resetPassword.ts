import axios from "axios";

export const resetPassword = async ({
  password,
  passwordConfirmed,
  resetToken,
}: {
  password: string;
  passwordConfirmed: string;
  resetToken: string;
}) => {
  const response = await axios.patch(`auth/resetPassword/${resetToken}`, {
    password,
    passwordConfirmed,
  });
  return response;
};
