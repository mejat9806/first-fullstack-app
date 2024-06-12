import { Ireply } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import React from "react";

interface IreplyData {
  replyData: Ireply;
}

const Reply = ({ replyData }: IreplyData) => {
  console.log(replyData);
  return (
    <div>
      <p>{replyData.text}</p>
    </div>
  );
};

export default Reply;
