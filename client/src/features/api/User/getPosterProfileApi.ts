import axios from "axios";
import { IBookmark, Iposts } from "@/utils/type";

interface IUserProfileData {
  id: string;
  name: string;
  email: string;
  posts: Iposts[];
  profileImage: string;
  likePosts: [];
  joinDate: string;
  bio: string;
  bannerImage: string;
  bookmark: IBookmark[];
}

interface IuserProfileResponse {
  data: IUserProfileData;
}

const getPosterProfileApi = async (
  userID: string,
): Promise<IUserProfileData> => {
  const response = await axios.get<IuserProfileResponse>(`/users/${userID}`, {
    onDownloadProgress(progressEvent) {
      console.log(progressEvent);
    },
  });
  return response.data.data;
};

export default getPosterProfileApi;
