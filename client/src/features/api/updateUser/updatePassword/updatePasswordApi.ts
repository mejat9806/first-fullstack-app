import { apiClient } from "@/utils/axios";

interface IPasswordUpdate {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

export const updatePasswordApi = async ({
  currentPassword,
  newPassword,
  passwordConfirm,
}: IPasswordUpdate) => {
  console.log(currentPassword, newPassword, passwordConfirm);
  const response = await apiClient.patch("/auth/updatePassword", {
    currentPassword: currentPassword,
    password: newPassword,
    passwordConfirmed: passwordConfirm,
  });
  return response;
};
