import { useTheme } from "@/components/darkMode/theme-provider";
import { useFetchDetails } from "@/features/api/Posts/PostDetail/useFetchDetail";
import PostDetail from "@/page/PostDetail";
import { Outlet } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import { RelevantAccount } from "./RelevantAccount";

export const PostLayout = () => {
  const { theme } = useTheme();

  const { singleDetailLoading, singleDetail } = useFetchDetails();
  if (!singleDetail || !singleDetail.data || singleDetailLoading) {
    return <LoadingPage />;
  }
  console.log(singleDetail, "single diteali");
  const { comments, author } = singleDetail.data;
  return (
    <div className="p-4 rounded-md flex flex-col md:flex-row gap-4  w-dvw md:max-w-lg md:w-[70%] my-24 lg:max-w-5xl ">
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
        <Outlet context={comments} />
      </div>
      <RelevantAccount comments={comments} author={author} />
    </div>
  );
};
