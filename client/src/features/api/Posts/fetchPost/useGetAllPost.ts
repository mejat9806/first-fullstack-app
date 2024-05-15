import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllPost } from "./fetchAllPost";

export const useGetAllPost = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchAllPost({ pageParam }), // Pass pageParam correctly
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage.data.length);
      return lastPage.data.length ? allPages.length + 1 : undefined;
    },
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};
