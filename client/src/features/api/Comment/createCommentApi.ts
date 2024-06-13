import axios from "axios";
import { IcreateComment } from "./useCreateComment";

export const createCommentApi = async ({
  postId,
  commentText,
}: IcreateComment) => {
  console.log(commentText);
  const response = await axios.post(`comment/${postId}`, {
    commentText: commentText,
  });
  return response;
};
