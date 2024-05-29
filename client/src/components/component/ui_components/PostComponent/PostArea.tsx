import { useGetAllPost } from "@/features/api/Posts/fetchPost/useGetAllPost";
import { useInView } from "react-intersection-observer";
import { useContext, useEffect } from "react";
import PostItem from "./PostItem";
import LoadingPage from "../LoadingPage";

import { fetchAllPost } from "@/features/api/Posts/fetchPost/fetchAllPost";
import { fetchlatest } from "@/features/api/Posts/fetchPost/fetchLatest";
import { UserContext } from "@/context/userContext";

const Post = () => {
  const { fetchType } = useContext(UserContext);
  //use type here to dynamically fetch data base on what the page want like recent or popular
  let postType = fetchAllPost;
  console.log(fetchType);
  if (fetchType === "popular") {
    postType = fetchAllPost;
  }
  if (fetchType === "recent") {
    postType = fetchlatest;
  }

  const { data, error, status, fetchNextPage, refetch, isLoadingAllPosts } =
    useGetAllPost({ fetchingFunction: postType });
  const { ref, inView } = useInView();

  useEffect(() => {
    refetch();
  }, [refetch, postType]);

  useEffect(() => {
    if (inView) {
      console.log("here");
      fetchNextPage();
    }
    return () => {};
  }, [fetchNextPage, inView]);
  if (isLoadingAllPosts) {
    return <LoadingPage />;
  }
  return status === "pending" ? (
    <div>
      <LoadingPage />
    </div>
  ) : status === "error" ? (
    <div>{error?.message}</div>
  ) : (
    <div className="w-[300px] md:w-[500px] h-full">
      {data?.pages.map((page, i) => (
        <div key={i} className="flex flex-col gap-5 mt-5">
          {page.data.map(
            (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              itemData: any,
              i: number,
            ) => (
              <div key={i}>
                <PostItem item={itemData} />
              </div>
            ),
          )}
        </div>
      ))}
      <div ref={ref} className="w-full h-1"></div>
    </div>
  );
};

export default Post;
