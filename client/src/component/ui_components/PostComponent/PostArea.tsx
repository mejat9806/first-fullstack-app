import { useGetAllPost } from "@/features/api/Posts/fetchPost/useGetAllPost";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
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

  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>{error.message}</div>
  ) : (
    <div className="w-[300px] md:w-[500px] h-full ">
      {data?.pages.map((page, i) => {
        return (
          <div
            key={data.pageParams[i]}
            className="bg-yellow-100 flex flex-col gap-96"
          >
            {page.data.map((item: []) => (
              <div key={item._id} className="bg-red-100 ">
                {item.title}
              </div>
            ))}
          </div>
        );
      })}
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
