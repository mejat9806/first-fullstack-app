import { apiClient } from "@/utils/axios";

export const likeDislikeApi = async (postId: string) => {
  const response = await apiClient.post(`likeDislike/${postId}`);
  return response;
};
