import { PostItemType } from "@/utils/type";
import { useInfiniteQuery } from "@tanstack/react-query";

type PageParams = string | number;

export type UseGetAllPostReturnType = {
  fetchType: string;
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
  fetchType,
  fetchingFunction,
}: {
  fetchType: string;
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
    queryKey: ["posts", fetchType],
    queryFn: ({ pageParam = 1 }) =>
      fetchingFunction({ pageParam: pageParam as number }), // Default pageParam to 1
    staleTime: 300000,
    initialPageParam: 1,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data?.length ? allPages?.length + 1 : undefined;
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
