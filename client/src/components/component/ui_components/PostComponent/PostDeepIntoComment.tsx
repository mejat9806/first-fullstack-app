import { useComment } from "@/features/api/Comment/useComment";
import { useParams } from "react-router-dom";
import CommentsList from "../Comment/CommentsList";

const PostDeepIntoComment = () => {
  const { commentId } = useParams();
  const { commentData, loadingCommentData } = useComment(commentId as string);

  return (
    <div> {commentData && <CommentsList comments={commentData.reply} />}</div>
  );
};

export default PostDeepIntoComment;
