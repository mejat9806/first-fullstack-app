import { useQuery } from "@tanstack/react-query";
import { getReplyApi } from "./getReplyApi";
import { useParams } from "react-router-dom";

export const useGetReply = () => {
  const { postId, commentId } = useParams();

  const { data: replyData, isLoading: loadingReplyData } = useQuery({
    queryKey: ["reply"],
    queryFn: () => {
      if (postId && commentId) {
        return getReplyApi({ postId, replyId: commentId });
      } else {
        throw new Error("no id");
      }
    },
  });
  return { replyData, loadingReplyData };
};
