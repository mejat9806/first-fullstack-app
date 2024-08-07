import { useQuery } from "@tanstack/react-query";
import { getCommentApi } from "./getCommentApi";
import { useParams } from "react-router-dom";

interface UseCommentParams {
  id?: string;
  runWith?: "commentId" | "replyId";
}

export const useComment = ({
  id = "",
  runWith = "commentId",
}: UseCommentParams = {}) => {
  // Provide default value here
  const { commentId } = useParams<{ commentId?: string }>();

  const Id = runWith === "replyId" ? id : commentId;

  const {
    data: commentData,
    isLoading: loadingCommentData,
    refetch: refetchComment,
  } = useQuery({
    queryKey: ["comment", Id],
    queryFn: () => getCommentApi(Id as string),
    // enabled: !!Id, // Ensure the query only runs if Id is defined
  });

  return { commentData, loadingCommentData, refetchComment };
};
