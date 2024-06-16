import axios from "axios";

export const replyApi = async ({
  postId,
  commentId,
  text,
}: {
  postId: string;
  commentId: string;
  text: string;
}) => {
  const response = await axios.post(`reply/${postId}/${commentId}`, { text });
  return response;
};
