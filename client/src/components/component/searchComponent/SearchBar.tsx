import useSearch from "@/features/api/search/useSearch";
import { Input } from "@/shadcnComponent/ui/input";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SearchResultSmall } from "./searchResult/SearchResultSmall";
import { useTheme } from "@/components/darkMode/theme-provider";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const searchBar = useRef<HTMLInputElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const [value] = useDebounce(searchInput, 500);
  const navigate = useNavigate();
  const { searchData } = useSearch({ search: value });
  const { theme } = useTheme();
  const { search } = useLocation();
  const handleClickOutside = (event: MouseEvent) => {
    if (wrapper.current && !wrapper.current.contains(event?.target as Node)) {
      setResultVisible(false);
      setSearchInput("");
      console.log("click");
    }
  };
  console.log(search);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResultVisible(false);
    if (!searchInput) {
      return;
    }
    if (searchInput) {
      console.log(searchInput);
      setSearchParams({ search: searchInput });
    }
    navigate(`/search/post?q=${searchInput} `, { state: searchData });
  };
  return (
    <div className="relative z-20" ref={wrapper}>
      <form
        className="flex items-center justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          ref={searchBar}
          placeholder="Search"
          value={searchInput}
          className="md:focus:w-64 md:w-60 w-32 searchBar focus:w-52 transition-all duration-100 ease-in-out h-7 focus-visible:outline-none"
          onChange={(e) => {
            setSearchInput(e.target.value), setResultVisible(true);
          }}
        />
      </form>
      {resultVisible && (
        <div
          className={`absolute -z-50  w-full shadow-lg rounded-b-xl pt-2 pb-5 ${
            theme === "dark"
              ? "bg-slate-600 text-white"
              : "bg-slate-200 text-black"
          }`}
        >
          <div className="">
            <h1
              className={`font-extrabold text-lg px-2 ${
                theme === "dark" ? "text-white/90" : " text-black/60"
              }`}
            >
              Post
            </h1>
            {searchData && searchData?.resultPost.length > 0 && (
              <div
                className={`w-full h-[0.01rem] px-0 ${
                  theme === "dark"
                    ? " bg-slate-300 text-white"
                    : "bg-gray-600 text-black"
                }`}
              ></div>
            )}
            <div className="divide-y divide-blue-200">
              {searchData?.resultPost &&
                searchData.resultPost.slice(0, 3).map((postResult) => (
                  <div
                    key={postResult.id}
                    className={`w-full ${
                      theme === "dark" ? "odd:bg-slate-500" : "bg-blue-50"
                    }`}
                  >
                    <SearchResultSmall
                      post={postResult}
                      type="post"
                      setSearchInput={setSearchInput}
                      setResultVisible={setResultVisible}
                    />
                  </div>
                ))}
            </div>

            <div>
              {searchData?.resultPost && searchData?.resultPost.length > 3 && (
                <button
                  className={`${
                    theme === "dark" ? "  text-white" : " text-black "
                  } font-bold  text-xs px-2`}
                  onClick={() => {
                    navigate(`/search/post?${search}`, {
                      state: searchData,
                    });
                    setSearchInput("");
                    setResultVisible(false);
                  }}
                >
                  More result ...
                </button>
              )}
            </div>
          </div>
          <div>
            <h1
              className={`font-extrabold text-lg px-2   ${
                theme === "dark" ? "text-white/90" : " text-black/60"
              }`}
            >
              User
            </h1>
            {/* {searchData && searchData?.resultUser.length > 0 && (
              <div
                className={`w-full h-[0.01rem] px-0 ${
                  theme === "dark"
                    ? " bg-slate-300 text-white"
                    : "bg-gray-600 text-black"
                }`}
              ></div>
            )} */}
            <div className="divide-y divide-blue-200">
              {searchData?.resultUser &&
                searchData.resultUser.slice(0, 3).map((postResult) => (
                  <div
                    key={postResult.id}
                    className={`w-full ${
                      theme === "dark" ? "odd:bg-slate-500" : "bg-blue-50"
                    } `}
                  >
                    {" "}
                    <SearchResultSmall
                      user={postResult}
                      type="user"
                      setSearchInput={setSearchInput}
                      setResultVisible={setResultVisible}
                    />
                  </div>
                ))}
            </div>

            <div>
              {searchData && searchData?.resultUser.length > 3 && (
                <button
                  className={`font-extrabold ${
                    theme === "dark" ? " text-white" : " text-black"
                  } text-xs px-2`}
                  onClick={() => {
                    navigate(`/search/user?${search} `, {
                      state: searchData,
                    });
                  }}
                >
                  More result ...
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
