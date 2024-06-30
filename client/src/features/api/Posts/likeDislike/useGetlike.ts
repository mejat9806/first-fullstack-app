import { useQuery } from "@tanstack/react-query";
import { getLike } from "./getLike";

export const useGetlike = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const { data: userLike, isLoading: isUserLikeData } = useQuery({
    queryKey: ["like", postId, userId],
    queryFn: () => getLike({ postId, userId }),
    enabled: !!postId && !!userId,
  });
  return { userLike, isUserLikeData };
};
