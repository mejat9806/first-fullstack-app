import axios from "axios";

export const refreshToken = () => {
  const refreshData = axios.get("/profile");
  return refreshData;
};
