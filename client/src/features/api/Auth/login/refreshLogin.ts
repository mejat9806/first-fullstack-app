import axios from "axios";

export const refreshToken = async (accesstoken: string) => {
  const response = await axios.get("/auth/isLogin", {
    headers: { Authorization: `Bearer ${accesstoken}` },
  });
  return response.data;
};
