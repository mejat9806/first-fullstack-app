import { apiClient } from "@/utils/axios";

export const forgotPassword = async (email: string) => {
  const response = await apiClient.post("/auth/forgotPassword", { email });
  return response;
};
