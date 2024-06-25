import axios from "axios";

export const getCommentApi = async (Id: string) => {
  const response = await axios.get(`/comment/${Id}`);
  return response.data;
};
