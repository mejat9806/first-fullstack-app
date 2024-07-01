import { apiClient } from "@/utils/axios";

export const checkEmail = async (email: string) => {
  const response = await apiClient.post("/auth/checkEmail", { email });
  return response.data.isValid;
};
