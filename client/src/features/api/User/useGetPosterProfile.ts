import { useQuery, useQueryClient } from "@tanstack/react-query";
import getPosterProfileApi from "./getPosterProfileApi";
import { useParams } from "react-router-dom";
import { IsinglePostDetail } from "../Posts/PostDetail/fetchPostDetail";

interface IUserProfileData {
  id: string;
  name: string;
  email: string;
  post: IsinglePostDetail[];
  profileImage: string;
}

export const useGetPosterProfile = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const userID = id || userId;
  const {
    isLoading: isGetProfile,
    data: userProfileData,
    error: isError,
  } = useQuery<IUserProfileData, Error>({
    queryKey: ["userProfile", userID],
    queryFn: () => {
      if (userID) {
        return getPosterProfileApi(userID);
      } else {
        return Promise.reject(new Error("No ID provided"));
      }
    },
    enabled: !!userID, // Only run the query if userID is defined
  });

  if (!userID) {
    queryClient.invalidateQueries({ queryKey: ["userProfile", userID] });
  }

  return {
    isGetProfile,
    isError,
    userProfileData,
  };
};
