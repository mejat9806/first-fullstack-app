import { apiClient } from "@/utils/axios";

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("auth/login", { email, password });
  console.log(response);
  return response;
};
