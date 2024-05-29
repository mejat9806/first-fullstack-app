import React from "react";
import { useParams } from "react-router-dom";
import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import LoadingPage from "../LoadingPage";

const ProfileUI = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, userProfileData, error } = useGetPosterProfile();

  if (!id) {
    return <div>No user ID provided.</div>;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error loading user profile: {error.message}</div>;
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
