import { apiClient } from "@/utils/axios";

export const getCommentApi = async (Id: string) => {
  console.log(Id, "commentID");
  const response = await apiClient.get(`/comment/${Id}`);
  return response.data;
};
