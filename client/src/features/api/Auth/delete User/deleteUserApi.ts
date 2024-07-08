import { apiClient } from "@/utils/axios";

export const deleteUserApi = async (userId: string) => {
  const response = await apiClient.delete(`/auth/deleteAccount/${userId}`);
  return response;
};
