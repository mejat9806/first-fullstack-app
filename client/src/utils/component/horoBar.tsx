import { OctagonIcon } from "lucide-react";
import React from "react";
import SearchBar from "./ui_components/SearchBar";
import ProfileIcon from "./ui_components/ProfileIcon";

const HoroBar = () => {
  return (
    <div className="bg-slate-200 fixed w-screen z-50">
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
