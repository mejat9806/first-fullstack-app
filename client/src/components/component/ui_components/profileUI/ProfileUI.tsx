import React, { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import LoadingPage from "../LoadingPage";
import { baseUrl } from "../PostComponent/PostItem";
import { Button } from "@/shadcnComponent/ui/button";
import "./../../../../App.css";
import { UserContext } from "@/context/userContext";
import { IoAddCircle, IoAddCircleOutline } from "react-icons/io5";
import DialogFN from "../DialogFN";
import AddBannerImage from "../../addBannerImage/AddBannerImage";

const ProfileUI = () => {
  const [openAddImage, setUpdateImage] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  const { id: userId } = useParams<{ id: string }>();
  const { user } = useContext(UserContext);
  if (!userId) {
    return <div>No user ID provided.</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isGetProfile, isError, userProfileData } = useGetPosterProfile({
    userId,
  });
  if (isGetProfile || !user) {
    return <LoadingPage />;
  }
  const userID = user.id || user.user.id;

  if (isError) {
    return <div>Error loading user profile: {isError.message}</div>;
  }
  if (!userProfileData) {
    return <div>No user profile data provided.</div>;
  }
  console.log(userProfileData);
  return (
    <div className="flex justify-center flex-col items-start w-full gap-3">
      <div className="w-full h-[200px] relative">
        <div className="h-full border-white border-2">
          <button onClick={() => setUpdateImage(true)}>
            {" "}
            <IoAddCircleOutline size={30} className="absolute top-0 right-0" />
          </button>
        </div>
        <img
          src={`${baseUrl}img/posts/${userProfileData.profileImage}`}
          alt={`${userProfileData.name}'s profile`}
          className="h-32 w-32 absolute -bottom-16 left-4 rounded-full"
        />
      </div>
      <div className="w-full flex justify-end mt-10"></div>
      <div className="mt-4 flex justify-between w-full">
        <div className="">
          <h1 className="text-3xl font-Poppins">{userProfileData.name}</h1>
          <p>{userProfileData.email}</p>
          <span>X follower</span> <span>X following</span>
        </div>
        {userID === userProfileData.id && <Button>Edit profile</Button>}
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
          All <span className="">{userProfileData.posts.length}</span>
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
      <DialogFN
        type="component"
        setIsOpen={setUpdateImage}
        open={openAddImage}
        component={<AddBannerImage setIsOpen={setUpdateImage} />}
      />
    </div>
  );
};

export default ProfileUI;
