import { OctagonIcon } from "lucide-react";
import SearchBar from "./SearchBar";
import ProfileIcon from "./profileUI/ProfileIcon";
import { useTheme } from "../../darkMode/theme-provider";
import { useNavigate } from "react-router-dom";

const HoroBar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  return (
    <div
      className={` fixed w-full z-50 ${
        theme === "dark"
          ? "text-white bg-black border-b-2 border-b-slate-100"
          : "text-black bg-slate-200 border-b-2 border-b-slate-900/10"
      } w-screen`}
    >
      <div className=" flex justify-between items-center h-14 mx-4 md:mx-12 rela">
        <div className="">
          <OctagonIcon onClick={() => navigate("/")} />
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
