import { useQuery } from "@tanstack/react-query";
import { getAllUserApi } from "./getAllUserApi";

export const useGetAllUser = () => {
  const { data: allUserData, isLoading: isLoadingAllUser } = useQuery({
    queryKey: ["Alluser"],
    queryFn: getAllUserApi,
  });
  return { allUserData, isLoadingAllUser };
};
