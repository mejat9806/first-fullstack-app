import { apiClient } from "@/utils/axios";

export const fetchlatest = async ({ pageParam }: { pageParam: number }) => {
  const response = await apiClient.get(`posts/latest/?page=${pageParam}`);
  return response.data;
};
