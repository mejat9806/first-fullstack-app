import axios from "axios";

export const deletePostApi = async (postId: string) => {
  const response = await axios.delete(`posts/${postId}`);

  return response;
};
