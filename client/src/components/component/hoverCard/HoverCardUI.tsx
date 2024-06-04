import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import React from "react";
import { baseUrl } from "../ui_components/PostComponent/PostItem";
import LoadingPage from "../ui_components/LoadingPage";

const HoverCardUI = ({ userId }: { userId: string }) => {
  console.log(userId);
  const { isError, isGetProfile, userProfileData } = useGetPosterProfile({
    userId,
  });
  if (isGetProfile) {
    return <LoadingPage />;
  }
  if (isError) {
    return <div>something goes wrong</div>;
  }

  console.log(userProfileData);
  return (
    <div className="flex gap-4">
      <img
        src={`${baseUrl}/img/posts/${userProfileData?.profileImage}`}
        alt="profileImage"
        className="h-[30px] w-[30px] rounded-full"
      />
      <div>
        <h1>name</h1>
        <p>xx/xx/xxxx</p>
      </div>
    </div>
  );
};

export default HoverCardUI;
