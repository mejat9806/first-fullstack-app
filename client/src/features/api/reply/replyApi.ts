import { apiClient } from "@/utils/axios";

export const replyApi = async ({
  postId,
  commentId,
  commentText,
}: {
  postId: string;
  commentId: string;
  commentText: string;
}) => {
  const response = await apiClient.post(`comment/${postId}/${commentId}`, {
    commentText,
  });
  return response;
};
