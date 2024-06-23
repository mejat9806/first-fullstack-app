import { useQuery, useQueryClient } from "@tanstack/react-query";
import getPosterProfileApi from "./getPosterProfileApi";
import { useParams } from "react-router-dom";
import {} from "@/components/component/ui_components/PostComponent/PostFooter";
import { UserType } from "@/utils/type";

export const useGetPosterProfile = ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const userID = id || userId;
  console.log(userID);
  const {
    isLoading: isGetProfile,
    data: userProfileData,
    error: isError,
  } = useQuery<UserType, Error>({
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
