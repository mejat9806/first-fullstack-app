import { apiClient } from "@/utils/axios";

export const resetPassword = async ({
  password,
  passwordConfirmed,
  resetToken,
}: {
  password: string;
  passwordConfirmed: string;
  resetToken: string;
}) => {
  const response = await apiClient.patch(`auth/resetPassword/${resetToken}`, {
    password,
    passwordConfirmed,
  });
  return response;
};
