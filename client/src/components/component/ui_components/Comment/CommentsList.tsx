import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";

import Comment from "./Comment";
import NoComment from "./NoComment";
import LoadingPage from "../LoadingPage";

interface CommentProps {
  comments: Icomment[];
}

const CommentsList = ({ comments }: CommentProps) => {
  console.log(comments);
  if (!comments) {
    return <LoadingPage />;
  }

  if (comments.length === 0) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <NoComment />
      </div>
    );
  }
  return (
    <div className=" flex flex-col  h-full">
      {comments.map((comment) => (
        <Comment key={comment._id} commentData={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
