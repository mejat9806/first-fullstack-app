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

  //use type here to dynamically fetch data base on what the page want like recent or popular
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
    return () => {};
  }, [fetchNextPage, inView, postType]);
  if (isLoadingAllPosts) {
    return <PostSkeleton />;
  }

  console.log(data, "in POST");
  if (!data) {
    return;
  }
  console.log(data, "postArea");
  if (data.pages[0].data.length === 0) {
    return (
      <div className="w-[300px] md:w-full h-full flex justify-center items-center mt-10">
        <h1 className="text-2xl capitalize">
          {" "}
          {fetchType === "home"
            ? "this will show the user that you follow "
            : "No Data"}
        </h1>
      </div>
    );
  }
  return status === "pending" ? (
    <div>{/* <LoadingPage /> */}</div>
  ) : status === "error" ? (
    <div>{error?.message}</div>
  ) : (
    <div className="w-full  h-full flex flex-col ">
      {data.pages.map((page, i) => (
        <div key={i} className="flex flex-col gap-10 mt-5  min-w-[600px] ">
          {page.data.sort().map((itemData, i: number) => (
            <div key={i} className="w-full flex justify-center items-center">
              <PostItem item={itemData} to="popular" />
            </div>
          ))}
        </div>
      ))}
      <div ref={ref} className="w-full h-1 bg-red"></div>
    </div>
  );
};

export default Post;
