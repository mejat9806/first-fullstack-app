import { useQuery, useQueryClient } from "@tanstack/react-query";
import getPosterProfileApi from "./getPosterProfileApi";
import { useParams } from "react-router-dom";
import {} from "@/components/component/ui_components/PostComponent/PostFooter";
import { IBookmark, Ilike, Iposts } from "@/utils/type";

interface IUserProfileData {
  bannerImage: string;
  bookmark: IBookmark[];
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
        throw new Error("User not found");
      }
    },
    enabled: !!userID, //this to make sure it only run when the userIs is existed
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
