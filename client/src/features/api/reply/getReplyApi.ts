import axios from "axios";
import React from "react";

export const getReplyApi = async ({ postId, replyId }) => {
  const respose = await axios.get(`/reply/${postId}/${replyId}`);
  return respose.data.reply;
};
