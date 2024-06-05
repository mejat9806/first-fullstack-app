import { OctagonIcon } from "lucide-react";
import React from "react";
import SearchBar from "./ui_components/SearchBar";
import ProfileIcon from "./ui_components/ProfileIcon";
import { useTheme } from "../darkMode/theme-provider";

const HoroBar = () => {
  const { theme } = useTheme();

  return (
    <div
      className={` fixed w-full z-50 ${
        theme === "dark"
          ? "text-white bg-black border-b-2 border-b-slate-100"
          : "text-black bg-slate-200 border-b-2 border-b-slate-900/10"
      }`}
    >
      <div className=" flex justify-between items-center h-14 mx-4 md:mx-12 rela">
        <div className="">
          <OctagonIcon />
        </div>
        <SearchBar />
        <div className="flex ">
          <ProfileIcon />
        </div>
      </div>
    </div>
  );
};

export default HoroBar;
