import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPostDetail } from "./fetchPostDetail";

export const useFetchDetails = () => {
  const { postId } = useParams();
  const {
    data: singleDetail,
    error: singleDetailError,
    isLoading: singleDetailLoading,
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => {
      if (postId) {
        return fetchPostDetail({ postId });
      }
    },
  });
  return { singleDetailLoading, singleDetail, singleDetailError };
};
