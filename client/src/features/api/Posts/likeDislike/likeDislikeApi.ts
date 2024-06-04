import axios from "axios";

export const likeDislikeApi = async (postId: string) => {
  const response = await axios.post(`likeDislike/${postId}`);
  return response;
};
