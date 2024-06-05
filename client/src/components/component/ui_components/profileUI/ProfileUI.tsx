import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import LoadingPage from "../LoadingPage";
import { baseUrl } from "../PostComponent/PostItem";
import { Button } from "@/shadcnComponent/ui/button";
import "./../../../../App.css";

const ProfileUI = () => {
  const location = useLocation();
  console.log(location.pathname);
  const { id: userId } = useParams<{ id: string }>();
  if (!userId) {
    return <div>No user ID provided.</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isGetProfile, isError, userProfileData } = useGetPosterProfile({
    userId,
  });
  if (isGetProfile) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error loading user profile: {isError.message}</div>;
  }
  if (!userProfileData) {
    return <div>No user profile data provided.</div>;
  }
  return (
    <div className="flex justify-center flex-col items-start w-full gap-3">
      <div className="w-full h-[200px] relative">
        <div className="h-full bg-red-400"></div>
        <img
          src={`${baseUrl}img/posts/${userProfileData.profileImage}`}
          alt={`${userProfileData.name}'s profile`}
          className="h-32 w-32 absolute -bottom-16 left-4"
        />
      </div>
      <div className="w-full flex justify-end">
        <Button>Edit profile</Button>
      </div>
      <div className="mt-4">
        <h1 className="text-3xl font-Poppins">{userProfileData.name}</h1>
        <p>{userProfileData.email}</p>
        <span>X follower</span> <span>X following</span>
      </div>
      <div className="flex gap-4">
        {/* <Button onClick={() => navigate("all")}>All</Button>
          <Button onClick={() => navigate("like")}>Like Post</Button>
          <Button onClick={() => navigate("bookmarksave")}>Bookmark</Button> */}
        <Link
          to={"all"}
          className={`${
            location.pathname === `/profile/${userProfileData.id}/all`
              ? "toAdd"
              : ""
          }  w-22 p-3 relative `}
        >
          All
        </Link>
        <Link
          defaultChecked={true}
          to={"like"}
          className={`${
            location.pathname == `/profile/${userProfileData.id}/like`
              ? "toAdd"
              : ""
          }  w-22 p-3 relative `}
        >
          Like <span className="">{userProfileData.likePosts.length}</span>
        </Link>
        <Link
          to={"bookmarksave"}
          className={`${
            location.pathname === `/profile/${userProfileData.id}/bookmarksave`
              ? "toAdd"
              : ""
          } w-22 p-3 relative `}
        >
          Bookmark
        </Link>
      </div>
    </div>
  );
};

export default ProfileUI;
