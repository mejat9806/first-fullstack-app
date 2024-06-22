import { UserType } from "@/utils/type";
import axios from "axios";

interface IuserProfileResponse {
  data: UserType;
}

const getPosterProfileApi = async (userID: string): Promise<UserType> => {
  const response = await axios.get<IuserProfileResponse>(`/users/${userID}`, {
    onDownloadProgress(progressEvent) {
      console.log(progressEvent);
    },
  });
  return response.data.data;
};

export default getPosterProfileApi;
