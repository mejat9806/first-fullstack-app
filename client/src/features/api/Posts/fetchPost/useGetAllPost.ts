import { PostItemType } from "@/utils/type";
import { useInfiniteQuery } from "@tanstack/react-query";

type PageParams = string | number;

export type UseGetAllPostReturnType = {
  data?: {
    pages: { data: PostItemType[] }[];
    pageParams: PageParams;
  };
  error?: { message: string };
  status: "pending" | "error" | "success";
  fetchNextPage: () => void;
};
type PostResponse = {
  data: PostItemType[];
};
export const useGetAllPost = ({
  fetchingFunction,
}: {
  fetchingFunction: ({
    pageParam,
  }: {
    pageParam: number;
  }) => Promise<PostResponse>;
}) => {
  if (!fetchingFunction) {
    throw new Error("fetchingFunction must be provided.");
  }
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading: isLoadingAllPosts,
    refetch,
  } = useInfiniteQuery<PostResponse>({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) =>
      fetchingFunction({ pageParam: pageParam as number }), // Default pageParam to 1
    staleTime: 300000, // 5 minutes
    initialPageParam: 1,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage, allPages) => {
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
    isLoadingAllPosts,
    refetch,
  };
};
