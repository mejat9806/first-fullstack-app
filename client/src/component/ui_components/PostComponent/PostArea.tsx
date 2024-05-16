import { useGetAllPost } from "@/features/api/Posts/fetchPost/useGetAllPost";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PostItem from "./PostItem";

const Post = () => {
  const { data, error, status, fetchNextPage } = useGetAllPost();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      console.log("run");
      fetchNextPage();
    }
    return () => {};
  }, [fetchNextPage, inView]);

  console.log(error);

  return status === "pending" ? (
    <div>Loading...</div>
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
            ) => (
              <div key={itemData._d} className="bg-red-100">
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
