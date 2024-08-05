import { apiClient } from "@/utils/axios";

export const deletePostApi = async (postId: string) => {
  const response = await apiClient.delete(`posts/${postId}`);

  return response;
};
