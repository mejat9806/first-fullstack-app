import { apiClient } from "@/utils/axios";

export const getReplyApi = async ({
  postId,
  replyId,
}: {
  postId: string;
  replyId: string;
}) => {
  const respose = await apiClient.get(`/reply/${postId}/${replyId}`);
  return respose.data.reply;
};
