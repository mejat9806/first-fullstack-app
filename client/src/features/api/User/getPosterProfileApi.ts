import axios from "axios";
import { IsinglePostDetail } from "../Posts/PostDetail/fetchPostDetail";

interface IUserProfileData {
  id: string;
  name: string;
  email: string;
  post: IsinglePostDetail[];
  profileImage: string;
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
