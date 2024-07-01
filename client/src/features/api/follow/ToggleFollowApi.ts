import { apiClient } from "@/utils/axios";

export const ToggleFollowApi = async (userId: string) => {
  const response = await apiClient.post(`/users/follow/${userId}`);
  return response;
};
