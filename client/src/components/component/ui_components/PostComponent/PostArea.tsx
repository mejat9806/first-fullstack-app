import { useGetAllPost } from "@/features/api/Posts/fetchPost/useGetAllPost";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PostItem from "./PostItem";
import { fetchAllPost } from "@/features/api/Posts/fetchPost/fetchAllPost";
import { fetchlatest } from "@/features/api/Posts/fetchPost/fetchLatest";
import { useDeletePost } from "@/features/api/Posts/deletePost/useDeletePost";
import { fetchFollowUserPost } from "@/features/api/Posts/fetchPost/fetchFollowUserPost";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PostSkeleton } from "./PostSkeleton";

const Post = ({ fetchType }: { fetchType: "recent" | "popular" | "home" }) => {
  const { pathname } = useLocation();
  console.log(pathname);
  const queryClient = useQueryClient();

  let postType = fetchAllPost;
  if (fetchType === "recent") {
    postType = fetchlatest;
  }
  if (fetchType === "home") {
    postType = fetchFollowUserPost;
  }
  if (fetchType === "popular") {
    postType = fetchAllPost;
  }

  const { data, error, status, fetchNextPage, refetch, isLoadingAllPosts } =
    useGetAllPost({ fetchingFunction: postType, fetchType });

  const { ref, inView } = useInView();
  const { isDeletePostLoading, status: statusDelete } = useDeletePost();

  useEffect(() => {
    refetch();
  }, [
    refetch,
    isDeletePostLoading,
    statusDelete,
    postType,
    pathname,
    queryClient,
  ]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, postType]);

  if (isLoadingAllPosts) {
    return <PostSkeleton />;
  }

  if (status === "error") {
    return <div>{error?.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }
  console.log(data.pages[0].data.length, "length");
  return (
    <div className="w-full h-full flex flex-col">
      {data.pages[0].data.length === 0 ? (
        <div>
          <h1>no data to show here,please follow other user</h1>
        </div>
      ) : (
        data.pages.map((page, i) => (
          <div
            key={i}
            className="flex flex-col gap-10 mt-5 w-full max-w-[600px]"
          >
            {page.data.sort().map((itemData, i: number) => (
              <div key={i} className="">
                <PostItem item={itemData} to="popular" />
              </div>
            ))}
          </div>
        ))
      )}
      <div ref={ref} className="w-full h-1 bg-red"></div>
    </div>
  );
};

export default Post;
