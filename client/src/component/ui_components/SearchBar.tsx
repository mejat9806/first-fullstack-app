import { Button } from "@/shadcnComponent/ui/button";
import { Input } from "@/shadcnComponent/ui/input";
import { SearchIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("query", searchInput);
    setSearchParams(params);
  }

  return (
    <form className="flex items-center justify-center gap-2" onSubmit={search}>
      <Input
        type="text"
        placeholder="Search"
        className="md:focus:w-64 md:w-60 w-32  focus:w-52 transition-all duration-100 ease-in-out h-7"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button className="h-7 ">
        <SearchIcon className="w-4" />
      </Button>
    </form>
  );
};

export default SearchBar;
