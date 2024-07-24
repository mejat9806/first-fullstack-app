import { useDeletePost } from "@/features/api/Posts/deletePost/useDeletePost";
import { fetchAllPost } from "@/features/api/Posts/fetchPost/fetchAllPost";
import { fetchFollowUserPost } from "@/features/api/Posts/fetchPost/fetchFollowUserPost";
import { fetchlatest } from "@/features/api/Posts/fetchPost/fetchLatest";
import { useGetAllPost } from "@/features/api/Posts/fetchPost/useGetAllPost";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import PostItem from "./PostItem";
import { PostSkeleton } from "./PostSkeleton";
import UseWebSocket from "../../../../lib/UseWebSocket";

const Post = ({ fetchType }: { fetchType: "recent" | "popular" | "home" }) => {
  const { pathname } = useLocation();
  const { socket } = UseWebSocket();
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

  const {
    data,
    error,
    status,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isLoadingAllPosts,
  } = useGetAllPost({ fetchingFunction: postType, fetchType });

  const { ref, inView } = useInView({});
  const { isDeletePostLoading, status: statusDelete } = useDeletePost();

  useEffect(() => {
    socket.on("postCreated", () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    });
  }, [queryClient, socket]);

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
      fetchNextPage({ cancelRefetch: false });
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage, postType]);
  console.log("refetch");
  useEffect(() => {
    const lastElement = document.getElementById("lastElement");

    if (!hasNextPage) {
      console.log("here");
      lastElement?.remove();
    }
  }); //this is if i want to remove the last element

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
    <div className="w-full h-full flex flex-col justify-center ">
      {data.pages[0].data.length === 0 ? (
        <div>
          <h1>no data to show here,please follow other user</h1>
        </div>
      ) : (
        data.pages.map((page, i) => (
          <div
            key={i}
            className="flex flex-col gap-10 mt-5 w-full max-w-[600px] items-center"
          >
            {page.data.sort().map((itemData, i: number) => (
              <PostItem item={itemData} to="popular" key={i} />
            ))}
          </div>
        ))
      )}
      <div
        ref={ref}
        className="w-full h-full  justify-center flex"
        id="lastElement"
      >
        {hasNextPage ? <h1>Loading...</h1> : <h1>no more post</h1>}
      </div>
    </div>
  );
};

export default Post;
