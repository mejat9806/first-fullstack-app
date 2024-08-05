import { SearchType } from "@/page/Search";
import { Location, useLocation } from "react-router-dom";
import SearchItem from "../SearchItem";
import { UserType } from "@/utils/type";
import { useTheme } from "@/components/darkMode/theme-provider";

export const UserSearch = () => {
  const location: Location<SearchType> = useLocation();
  const { resultUser } = location.state;
  const { theme } = useTheme();

  return (
    <div className="flex flex-col">
      {resultUser.map((userSearch: UserType) => (
        <div
          className={`${
            theme === "dark" ? "odd:bg-slate-950" : "odd:bg-blue-50"
          }`}
          key={userSearch._id}
        >
          <SearchItem user={userSearch} key={userSearch.id} type="user" />
        </div>
      ))}
    </div>
  );
};
