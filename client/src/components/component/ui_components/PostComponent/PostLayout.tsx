import { useTheme } from "@/components/darkMode/theme-provider";
import { useFetchDetails } from "@/features/api/Posts/PostDetail/useFetchDetail";
import PostDetail from "@/page/PostDetail";
import { Outlet } from "react-router-dom";
import { RelevantAccount } from "./RelevantAccount";
import { PostDetailsSkeleton } from "./PostDetailsSkeleton";

export const PostLayout = () => {
  const { theme } = useTheme();

  const { singleDetailLoading, singleDetail } = useFetchDetails();

  return (
    <div className="p-4 rounded-md flex flex-col md:flex-row gap-4  w-[dvw] sm:w-[80%] md:max-w-lg md:w-[70%] my-24 lg:max-w-5xl ">
      {!singleDetail || singleDetailLoading ? (
        <PostDetailsSkeleton skeletonType="postDetail" />
      ) : (
        <div
          className={`${
            theme === "dark"
              ? "text-white bg-slate-900 border-2 border-slate-100"
              : "text-black bg-slate-50 shadow-xl"
          } p-4 w-full`}
        >
          <div className="">
            <PostDetail singleData={singleDetail} />
          </div>
          <div className="mt-5">
            <Outlet context={singleDetail.data.comments} />
          </div>
        </div>
      )}
      {!singleDetail || singleDetailLoading ? (
        <PostDetailsSkeleton skeletonType="relevant" />
      ) : (
        <RelevantAccount
          comments={singleDetail.data.comments}
          author={singleDetail.data.author}
        />
      )}
    </div>
  );
};
