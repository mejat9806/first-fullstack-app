import { apiClient } from "@/utils/axios";
import { UserType } from "@/utils/type";

interface getAllUserType {
  amountOfDoc: number;
  data: UserType[];
}
export const getAllUserApi = async () => {
  const response = await apiClient.get<getAllUserType>("/users");
  return response.data;
};
