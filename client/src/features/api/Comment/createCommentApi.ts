import axios from "axios";
import { IcreateComment } from "./useCreateComment";

export const createCommentApi = async ({
  postId,
  commentText,
}: IcreateComment) => {
  console.log(commentText, "this is in API");

  const response = await axios.post(`comment/${postId}`, {
    commentText: commentText,
  });
  console.log(response.data);
  return response;
};
