import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import React from "react";
import Reply from "./reply/Reply";
import DOMPurify from "dompurify";

interface ICommentData {
  commentData: Icomment;
}
const Comment = ({ commentData }: ICommentData) => {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(commentData.commentText),
        }}
      ></div>
      <div>
        {commentData &&
          commentData.reply.map((reply) => (
            <Reply key={reply._id} replyData={reply} />
          ))}
      </div>
    </div>
  );
};

export default Comment;
