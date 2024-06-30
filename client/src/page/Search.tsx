import SearchResultLayout from "./SearchResultLayout";
import { Iposts, UserType } from "@/utils/type";
export type SearchType = {
  resultUser: UserType[];
  resultPost: [Iposts];
};

export interface Searchresult {
  data: SearchType;
}
export const Search = () => {
  return (
    <div>
      <SearchResultLayout />
    </div>
  );
};
