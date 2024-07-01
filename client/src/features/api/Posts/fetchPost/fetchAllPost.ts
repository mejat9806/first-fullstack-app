import { apiClient } from "@/utils/axios";

export const fetchAllPost = async ({ pageParam }: { pageParam: number }) => {
  const response = await apiClient.get(`posts/popular/?page=${pageParam}`);
  return response.data;
};
