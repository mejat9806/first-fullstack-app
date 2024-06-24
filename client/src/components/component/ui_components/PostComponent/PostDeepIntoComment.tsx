import { useComment } from "@/features/api/Comment/useComment";
import { useParams } from "react-router-dom";
import CommentsList from "../Comment/CommentsList";
import LoadingPage from "../LoadingPage";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";

const PostDeepIntoComment = () => {
  const { setComment } = useContext(UserContext);
  const params = useParams();

  const { commentData, loadingCommentData, refetchComment } = useComment();

  useEffect(() => {
    refetchComment();
  }, [params, refetchComment]);

  if (loadingCommentData) {
    return <LoadingPage className="h-fit" />;
  }

  setComment(commentData);
  console.log(commentData, "vavasvav");

  return (
    <div> {commentData && <CommentsList comments={commentData.reply} />}</div>
  );
};

export default PostDeepIntoComment;
