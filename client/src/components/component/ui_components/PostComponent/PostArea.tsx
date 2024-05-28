import { useGetAllPost } from "@/features/api/Posts/fetchPost/useGetAllPost";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PostItem from "./PostItem";
import LoadingPage from "../LoadingPage";
import { useSearchParams } from "react-router-dom";

const Post = () => {
  const { data, error, status, fetchNextPage, refetch, isLoadingAllPosts } =
    useGetAllPost();
  const { ref, inView } = useInView();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    refetch();
  }, []);

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
      <div ref={ref}></div>
    </div>
  );
};

export default Post;

// <div className="w-[300px] md:w-[500px] h-full ">
//   <h1 className="text-6xl font-bold font-Poppins">Post</h1>
//   <div className="flex gap-y-5 flex-col">
//     <PostItem image="/registerPhoto.jpg" />
//     <PostItem />
//   </div>
// </div>
