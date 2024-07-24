import { apiClient } from "@/utils/axios";
import { UserType } from "@/utils/type";

interface IuserProfileResponse {
  data: UserType;
}

const getPosterProfileApi = async (userID: string): Promise<UserType> => {
  const response = await apiClient.get<IuserProfileResponse>(
    `/users/${userID}`,
    {
      onDownloadProgress(progressEvent) {},
    },
  );
  return response.data.data;
};

export default getPosterProfileApi;
