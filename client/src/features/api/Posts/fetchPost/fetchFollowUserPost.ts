import { apiClient } from "@/utils/axios";

export const fetchFollowUserPost = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const response = await apiClient.get(`posts/following/?page=${pageParam}`);
  return response.data;
};
