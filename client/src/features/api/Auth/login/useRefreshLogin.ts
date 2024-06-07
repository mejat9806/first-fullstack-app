import { useQuery } from "@tanstack/react-query";
import { refreshToken } from "./refreshLogin";

export const useRefreshLogin = (accesstoken: string) => {
  const { data: refreshLoginData, isLoading: isRefreshLogin } = useQuery({
    queryKey: ["profile", accesstoken],
    queryFn: () => refreshToken(accesstoken),
  });
  return { refreshLoginData, isRefreshLogin };
};
