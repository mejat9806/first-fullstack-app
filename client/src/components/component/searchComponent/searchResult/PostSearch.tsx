import { SearchType } from "@/page/Search";
import { Iposts } from "@/utils/type";
import { Location, useLocation } from "react-router-dom";
import SearchItem from "../SearchItem";
import { useTheme } from "@/components/darkMode/theme-provider";

export const PostSearch = () => {
  const location: Location<SearchType> = useLocation();
  const { resultPost } = location.state;
  const { theme } = useTheme();

  console.log(resultPost);
  return (
    <div className="flex flex-col">
      {resultPost.map((postSearch: Iposts) => (
        <div
          key={postSearch.id}
          className={`${
            theme === "dark" ? "odd:bg-slate-950" : "odd:bg-blue-50"
          }  `}
        >
          <SearchItem post={postSearch} />
        </div>
      ))}
    </div>
  );
};
