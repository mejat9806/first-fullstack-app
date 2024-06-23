import axios from "axios";

export const getCommentApi = async (commentId: string) => {
  const response = await axios.get(`/comment/${commentId}`);
  return response.data;
};
