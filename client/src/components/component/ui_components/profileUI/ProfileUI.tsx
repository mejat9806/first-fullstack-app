import React from "react";
import { useParams } from "react-router-dom";
import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import LoadingPage from "../LoadingPage";

const ProfileUI = () => {
  const { id } = useParams<{ id: string }>();
  const { isGetProfile, isError, userProfileData } = useGetPosterProfile();
  console.log(userProfileData);
  if (!id) {
    return <div>No user ID provided.</div>;
  }

  if (isGetProfile) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error loading user profile: {isError.message}</div>;
  }

  if (userProfileData) {
    console.log(userProfileData);
    return (
      <div>
        <h1>{userProfileData.name}</h1>
        <p>{userProfileData.email}</p>
        <img
          src={userProfileData.profileImage}
          alt={`${userProfileData.name}'s profile`}
        />
      </div>
    );
  }

  return <div>No user profile data found.</div>;
};

export default ProfileUI;
