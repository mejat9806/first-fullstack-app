import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import { useOutletContext } from "react-router-dom";
import CommentsList from "../Comment/CommentsList";

export const CommentItem = () => {
  const comments = useOutletContext() as Icomment[];

  return <div>{comments && <CommentsList comments={comments} />}</div>;
};
