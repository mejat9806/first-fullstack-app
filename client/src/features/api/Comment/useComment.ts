import { useQuery } from "@tanstack/react-query";
import { getCommentApi } from "./getCommentApi";
import { useParams } from "react-router-dom";

export const useComment = () => {
  const { commentId } = useParams();
  console.log(commentId, "comment sd");
  const {
    data: commentData,
    isLoading: loadingCommentData,
    refetch: refetchComment,
  } = useQuery({
    queryKey: ["comment"],
    queryFn: () => {
      if (commentId) {
        return getCommentApi(commentId);
      } else {
        throw new Error("no id");
      }
    },
  });
  return { commentData, loadingCommentData, refetchComment };
};
