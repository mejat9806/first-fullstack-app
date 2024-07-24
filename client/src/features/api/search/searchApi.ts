import { apiClient } from "@/utils/axios";
import { UserType, Iposts } from "@/utils/type";
export interface searchResult {
  resultUser: UserType[];
  resultPost: Iposts[];
}
const searchApi = async ({ search }: { search: string }) => {
  const response = await apiClient.get<searchResult>(`search?q=${search}`, {
    onDownloadProgress: (progress) => {},
  });
  return response;
};

export default searchApi;
