import { SearchType } from "@/page/Search";
import { Iposts } from "@/utils/type";
import { Location, useLocation } from "react-router-dom";
import SearchItem from "../SearchItem";

export const PostSearch = () => {
  const location: Location<SearchType> = useLocation();
  const { resultPost } = location.state;
  console.log(resultPost);
  return (
    <div className="flex">
      {resultPost.map((postSearch: Iposts) => (
        <SearchItem post={postSearch} key={postSearch.id} type="post" />
      ))}
    </div>
  );
};
