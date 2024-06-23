import { useQuery } from "@tanstack/react-query";
import { getReplyApi } from "./getReplyApi";
import { useParams } from "react-router-dom";

export const useGetReply = () => {
  const { postId, replyId } = useParams();
  console.log(postId, replyId, "use reply");
  const { data: replyData, isLoading: loadingReplyData } = useQuery({
    queryKey: ["reply"],
    queryFn: () => {
      if (postId && replyId) {
        return getReplyApi({ postId, replyId });
      } else {
        throw new Error("no id");
      }
    },
  });
  return { replyData, loadingReplyData };
};
