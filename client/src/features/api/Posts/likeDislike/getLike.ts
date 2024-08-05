import { apiClient } from "@/utils/axios";

export const getLike = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const response = await apiClient.get(
    `likeDislike/getLike/${postId}/${userId}`,
  );
  return response.data;
};
