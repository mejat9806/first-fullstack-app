import axios from "axios";

interface Ibookmark {
  post: string;
  user: string;
  _id: string;
  createAt: string;
}
const bookmarkApi = async (postId: string) => {
  const response = await axios.post<Ibookmark>(
    `bookmark/addBookmark/${postId}`,
  );
  return response;
};

export default bookmarkApi;
