import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPostDetail } from "./fetchPostDetail";

export const useFetchDetails = () => {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: singleDetail,
    error: singleDetailError,
    isLoading: singleDetailLoading,
    isFetching,
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => {
      if (postId) {
        return fetchPostDetail({ postId });
      }
    },
    enabled: !!postId,
    gcTime: 0,
  });

  if (!postId) {
    queryClient.removeQueries({ queryKey: ["post"] });
  }

  return { singleDetailLoading, isFetching, singleDetail, singleDetailError };
};
