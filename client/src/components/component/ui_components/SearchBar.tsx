import useSearch from "@/features/api/search/useSearch";
import { Button } from "@/shadcnComponent/ui/button";
import { Input } from "@/shadcnComponent/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState<null | string>(null);
  const searchBar = useRef<HTMLInputElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [resultVisible, setResultVisible] = useState(false);

  const [value] = useDebounce(searchInput, 500);
  console.log(value);
  const { searchData } = useSearch({ search: value });

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapper.current && !wrapper.current.contains(event?.target as Node)) {
      setSearchInput(null);
      setResultVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [searchInput]);

  return (
    <div className="relative" ref={wrapper}>
      <form className="flex items-center justify-center gap-2">
        <Input
          type="text"
          ref={searchBar}
          placeholder="Search"
          className="md:focus:w-64 md:w-60 w-32 searchBar focus:w-52 transition-all duration-100 ease-in-out h-7"
          onChange={(e) => {
            setSearchInput(e.target.value), setResultVisible(true);
          }}
        />
        <Button className="h-7 ">
          <SearchIcon className="w-4" />
        </Button>
      </form>
      {resultVisible && (
        <div className="absolute">
          <div>
            {searchData?.resultPost &&
              searchData.resultPost.map((postResult) => (
                <div key={postResult.id}>{postResult.title}</div>
              ))}
          </div>
          <div>
            {searchData?.resultUser &&
              searchData.resultUser.map((postResult) => (
                <div key={postResult.id}>{postResult.name}</div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
