import { useQuery } from "@tanstack/react-query";
import { getCommentApi } from "./getCommentApi";

export const useComment = (commentId: string | undefined) => {
  const { data: commentData, isLoading: loadingCommentData } = useQuery({
    queryKey: ["comment"],
    queryFn: () => {
      if (commentId) {
        return getCommentApi(commentId);
      } else {
        throw new Error("no id");
      }
    },
  });
  return { commentData, loadingCommentData };
};
