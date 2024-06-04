import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeDislikeApi } from "./likeDislikeApi";

export const useLikeDislike = () => {
  const queryClient = useQueryClient();
  const {
    isPending: isLikeDislike,
    mutate: likeDislike,
    isSuccess: successLike,
    data: likeData,
  } = useMutation({
    mutationFn: likeDislikeApi,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["like"], data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["like", data] });
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
