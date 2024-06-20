import { useTheme } from "@/components/darkMode/theme-provider";
import { Button } from "@/shadcnComponent/ui/button";
import { IoMdArrowBack } from "react-icons/io";

import { useLocation, useNavigate } from "react-router-dom";

const WrongPathPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div
      className={`h-screen w-screen flex justify-center items-center flex-col gap-4 ${
        theme === "dark" ? "text-white   " : "text-black  "
      }`}
    >
      <div className=" flex justify-center items-center ">
        <h1 className="text-xl ">
          {pathname.slice(1)} is does not exist <span>😞</span>
        </h1>
      </div>
      <div>
        <Button onClick={() => navigate(-1)}>
          <IoMdArrowBack />
        </Button>
      </div>
    </div>
  );
};

export default WrongPathPage;
