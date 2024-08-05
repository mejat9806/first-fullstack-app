import { apiClient } from "@/utils/axios";

export const refreshToken = async (accesstoken: string) => {
  const response = await apiClient.get("/auth/isLogin", {
    headers: { Authorization: `Bearer ${accesstoken}` },
  });
  return response.data;
};
