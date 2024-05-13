import { OctagonIcon } from "lucide-react";
import React from "react";
import SearchBar from "./ui_components/SearchBar";
import ProfileIcon from "./ui_components/ProfileIcon";

const HoroBar = () => {
  return (
    <div className="bg-blue-200/20">
      <div className=" flex justify-between items-center h-14 mx-3 md:mx-12">
        <div className="">
          <OctagonIcon />
        </div>
        <SearchBar />
        <ProfileIcon />
      </div>
    </div>
  );
};

export default HoroBar;
