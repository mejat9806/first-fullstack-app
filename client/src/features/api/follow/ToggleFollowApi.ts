import axios from "axios";

export const ToggleFollowApi = async (userId: string) => {
  const response = await axios.post(`/users/follow/${userId}`);
  return response;
};
