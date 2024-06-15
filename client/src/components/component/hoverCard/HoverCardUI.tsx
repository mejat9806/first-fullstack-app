import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import React from "react";
import { baseUrl } from "../ui_components/PostComponent/PostItem";
import LoadingPage from "../ui_components/LoadingPage";
import { dateFormat } from "@/utils/dateFormat";
import { Button } from "@/shadcnComponent/ui/button";

const HoverCardUI = ({ userId }: { userId: string }) => {
  console.log(userId);
  const { isError, isGetProfile, userProfileData } = useGetPosterProfile({
    userId,
  });
  if (isGetProfile || !userProfileData) {
    return <LoadingPage />;
  }
  if (isError) {
    return <div>something goes wrong</div>;
  }
  const dateJoin = userProfileData.joinDate.split("T")[0];
  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-4 flex-col">
        <img
          src={`${baseUrl}/img/posts/${userProfileData?.profileImage}`}
          alt="profileImage"
          className="h-[50px] w-[50px] rounded-full"
        />
        <div>
          <h1 className="font-medium">{userProfileData?.name}</h1>
          <p>{userProfileData.bio}</p>
          <p>
            <span className="font-semibold">{dateFormat(dateJoin, false)}</span>
          </p>
        </div>
      </div>
      <div>
        <Button className="w-14 rounded-full">Follow</Button>
      </div>
    </div>
  );
};

export default HoverCardUI;
