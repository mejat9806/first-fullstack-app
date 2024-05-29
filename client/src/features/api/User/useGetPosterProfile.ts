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

export const useGetPosterProfile = () => {
  const queryClient = useQueryClient();
  const { id: userID } = useParams<{ id: string }>();

  const queryResult = useQuery<IUserProfileData, Error>({
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
    isLoading: queryResult.isLoading,
    userProfileData: queryResult.data,
    error: queryResult.error,
  };
};
