import { apiClient } from "@/utils/axios";
import { IcreateComment } from "./useCreateComment";

export const createCommentApi = async ({
  postId,
  commentText,
}: IcreateComment) => {
  const response = await apiClient.post(`comment/${postId}`, {
    commentText: commentText,
  });

  return response;
};
