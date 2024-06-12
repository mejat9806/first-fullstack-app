import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import React from "react";
import Comment from "./Comment";

interface CommentProps {
  comments: Icomment[];
}

const CommentsList = ({ comments }: CommentProps) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment._id} commentData={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
