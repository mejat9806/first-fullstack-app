import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import React from "react";
import Reply from "./reply/Reply";

interface ICommentData {
  commentData: Icomment;
}
const Comment = ({ commentData }: ICommentData) => {
  return (
    <div>
      <h1>{commentData.commentText}</h1>
      <div>
        {commentData.reply.map((reply) => (
          <Reply key={reply._id} replyData={reply} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
