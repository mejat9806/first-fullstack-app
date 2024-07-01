import { apiClient } from "@/utils/axios";

export const getCommentApi = async (Id: string) => {
  const response = await apiClient.get(`/comment/${Id}`);
  return response.data;
};
