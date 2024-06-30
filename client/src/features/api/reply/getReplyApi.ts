import axios from "axios";

export const getReplyApi = async ({
  postId,
  replyId,
}: {
  postId: string;
  replyId: string;
}) => {
  const respose = await axios.get(`/reply/${postId}/${replyId}`);
  return respose.data.reply;
};
