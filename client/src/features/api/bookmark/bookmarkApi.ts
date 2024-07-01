import { apiClient } from "@/utils/axios";

interface Ibookmark {
  post: string;
  user: string;
  _id: string;
  createAt: string;
}
const bookmarkApi = async (postId: string) => {
  const response = await apiClient.post<Ibookmark>(
    `bookmark/addBookmark/${postId}`,
  );
  return response;
};

export default bookmarkApi;
