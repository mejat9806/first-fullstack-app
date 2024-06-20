import { PostItemType, UserType } from "@/utils/type";
import axios from "axios";

export interface searchResult {
  resultUser: UserType[];
  resultPost: PostItemType[];
}
const searchApi = async ({ search }: { search: string }) => {
  const response = await axios.get<searchResult>(`search?q=${search}`, {
    onDownloadProgress: (progress) => {
      console.log(progress);
    },
  });
  return response;
};

export default searchApi;
