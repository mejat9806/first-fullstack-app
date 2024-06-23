import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import React from "react";
import { useOutletContext } from "react-router-dom";
import CommentsList from "../Comment/CommentsList";

export const CommentItem = () => {
  const comments = useOutletContext() as Icomment[];
  console.log(comments, "Comments");
  return <div> {comments && <CommentsList comments={comments} />}</div>;
};
