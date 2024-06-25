import { useComment } from "@/features/api/Comment/useComment";
import { useParams } from "react-router-dom";
import CommentsList from "../Comment/CommentsList";
import LoadingPage from "../LoadingPage";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";

const PostDeepIntoComment = () => {
  const { setComment } = useContext(UserContext);
  const params = useParams<{ commentId?: string }>();

  const { commentData, loadingCommentData, refetchComment } = useComment({
    id: params.commentId || "",
  });

  useEffect(() => {
    if (params) {
      refetchComment();
    }
  }, [params, refetchComment]);

  useEffect(() => {
    if (commentData) {
      setComment(commentData);
    }
  }, [commentData, setComment]);

  if (loadingCommentData) {
    return <LoadingPage className="h-fit" />;
  }

  return (
    <div>{commentData && <CommentsList comments={commentData.reply} />}</div>
  );
};

export default PostDeepIntoComment;
