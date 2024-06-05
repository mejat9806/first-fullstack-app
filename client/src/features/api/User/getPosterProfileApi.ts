import axios from "axios";
import { Iposts } from "./useGetPosterProfile";

interface IUserProfileData {
  id: string;
  name: string;
  email: string;
  posts: Iposts[];
  profileImage: string;
  likePosts: [];
}

interface IuserProfileResponse {
  data: IUserProfileData;
}

const getPosterProfileApi = async (
  userID: string,
): Promise<IUserProfileData> => {
  const response = await axios.get<IuserProfileResponse>(`/users/${userID}`);
  return response.data.data;
};

export default getPosterProfileApi;
