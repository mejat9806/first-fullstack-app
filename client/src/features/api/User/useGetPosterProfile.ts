import { useQuery, useQueryClient } from "@tanstack/react-query";
import getPosterProfileApi from "./getPosterProfileApi";
import { useParams } from "react-router-dom";
import { Ilike } from "@/components/component/ui_components/PostComponent/PostFooter";

export interface Iposts {
  name: string;
  email: string;
  profileImage: string;
  createAt: string;
  detail: string;
  id: string;
  image: [string];
  likesCount: number;
  slug: string;
  title: string;
}
interface IUserProfileData {
  bannerImage: string;
  bookmark: Iposts[];
  id: string;
  name: string;
  email: string;
  likePosts: Ilike[];
  posts: Iposts[];
  profileImage: string;
  joinDate: string;
  bio: string;
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
