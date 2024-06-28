import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeDislikeApi } from "./likeDislikeApi";
import { useParams } from "react-router-dom";

export const useLikeDislike = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const {
    isPending: isLikeDislike,
    mutate: likeDislike,
    isSuccess: successLike,
    data: likeData,
  } = useMutation({
    mutationFn: likeDislikeApi,
    mutationKey: ["like"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", id] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    likeDislike,
    isLikeDislike,
    successLike,
    likeData,
  };
};
