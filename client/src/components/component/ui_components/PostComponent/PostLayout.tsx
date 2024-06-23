import { useTheme } from "@/components/darkMode/theme-provider";
import { useFetchDetails } from "@/features/api/Posts/PostDetail/useFetchDetail";
import PostDetail from "@/page/PostDetail";
import React from "react";
import { Outlet } from "react-router-dom";
import LoadingPage from "../LoadingPage";

export const PostLayout = () => {
  const { theme } = useTheme();
  const { singleDetailLoading, singleDetail } = useFetchDetails();
  if (!singleDetail || !singleDetail.data || singleDetailLoading) {
    return <LoadingPage />;
  }
  const { comments } = singleDetail.data;
  return (
    <div
      className={`${
        theme === "dark"
          ? "text-white bg-slate-900 border-2 border-slate-100"
          : "text-black bg-slate-50 shadow-xl"
      } p-4 rounded-md flex flex-col gap-4 md::min-w-[50%] w-full md:max-w-4xl md:w-1/2 my-24`}
    >
      <PostDetail singleData={singleDetail} />
      <Outlet context={comments} />
    </div>
  );
};
