import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllPost } from "./fetchAllPost";
import { PostItemType } from "@/component/ui_components/PostComponent/PostItem";
type PageParams = (string | number)[]; // adjust as needed

export type UseGetAllPostReturnType = {
  data?: {
    pages: PostItemType[];
    pageParams: PageParams;
  };
  error?: { message: string };
  status: "pending" | "error" | "success";
  fetchNextPage: () => void;
};
export const useGetAllPost = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchAllPost({ pageParam }), // Pass pageParam correctly
    initialPageParam: 1,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchInterval: 6000000,
    notifyOnChangeProps: ["data"],

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
    isLoading,
  };
};
