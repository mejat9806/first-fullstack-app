import axios from "axios";

export const replyApi = async ({
  postId,
  commentId,
  commentText,
}: {
  postId: string;
  commentId: string;
  commentText: string;
}) => {
  const response = await axios.post(`comment/${postId}/${commentId}`, {
    commentText,
  });
  return response;
};
