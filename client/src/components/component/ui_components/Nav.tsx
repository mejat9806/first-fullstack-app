import { Link, useLocation } from "react-router-dom";

import { BookMarked, CompassIcon, HomeIcon, PenIcon } from "lucide-react";
import { useTheme } from "../../darkMode/theme-provider";
import { Button } from "@/shadcnComponent/ui/button";
import DialogFN from "./DialogFN";
import { useContext, useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
import PopularIcon from "../../SVG/PopularIcon";
import { UserContext } from "@/context/userContext";

function Nav() {
  const [openWrite, setOpenWrite] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const { user } = useContext(UserContext);
  const navitems = [
    {
      name: "Home",
      icons: <HomeIcon />,
      link: "/",
    },

    {
      name: "Popular",
      icons: <PopularIcon style=" stroke-current stroke-1 	" />,
      link: "/popular",
    },

    {
      name: "Explore",
      icons: <CompassIcon />,
      link: "/explore",
    },
    {
      name: "Bookmark",
      icons: <BookMarked />,
      link: `/profile/${user?.id}/bookmarksave`,
    },
  ];

  return (
    <>
      <nav
        className={`lg:hidden flex w-screen justify-center items-start	fixed bottom-0  
          backdrop-blur-2xl z-50`}
      >
        <div
          className={`flex w-full h-1/3 py-1 justify-center gap-6 ${
            theme == "dark" ? "bg-background" : "bg-slate-100"
          } `}
        >
          {navitems.map((navitem) => (
            <Link
              aria-label="label"
              to={navitem.link}
              className={`flex hover:scale-100 h-10 w-10 justify-center items-center  hover:text-slate-200  rounded-full  ${
                location.pathname === navitem.link
                  ? `${
                      theme === "dark"
                        ? "text-white bg-slate-900 stroke-white"
                        : "text-black bg-slate-300 stroke-black"
                    } `
                  : ``
              }`}
              key={navitem.name}
            >
              <i>{navitem.icons}</i>{" "}
            </Link>
          ))}
          <Button
            className={`flex h-10 w-10 hover:scale-105 justify-center items-center     ${
              theme === "dark"
                ? "hover:bg-white bg-blue-300"
                : "text-slate-900 bg-blue-300 hover:bg-slate-300"
            } rounded-full `}
            onClick={() => setOpenWrite(true)}
          >
            <i>
              <PenIcon
                className={`${
                  theme === "dark"
                    ? "hover:stroke-slate-500 stroke-black"
                    : "hover:stroke-slate-700 stroke-black"
                } `}
              />
            </i>{" "}
            <span className="hidden md:flex transition-all duration-150">
              Write
            </span>
          </Button>
        </div>
        <DialogFN
          type="component"
          setIsOpen={setOpenWrite}
          open={openWrite}
          component={<CreatePost setIsOpen={setOpenWrite} />}
        />
      </nav>
      <nav
        className={`lg:flex flex-col justify-between  items-center h-screen  w-[60px] md:w-[140px]  backdrop-blur-2xl	fixed hidden  transition-all duration-150 mt-12  ${
          theme === "dark"
            ? "text-white bg-black  "
            : "text-black bg-slate-100  "
        } `}
      >
        <div className="flex flex-col gap-5  h-1/3 mt-10 transition-all duration-150">
          {navitems.map((navitem) => (
            <Link
              aria-label="label"
              to={navitem.link}
              className={`flex gap-2 hover:scale-100 p-3 mx-10 md:w-32 transition-transform duration-150  hover:text-slate-400  rounded-lg  
              `}
              key={navitem.name}
            >
              <i>{navitem.icons}</i>{" "}
              <span className="hidden md:flex transition-all duration-150">
                {navitem.name}
              </span>
            </Link>
          ))}
          <Button
            className={`flex gap-2 hover:scale-105 p-3 mx-10 group  md:w-32 transition-transform duration-150   ${
              theme === "dark"
                ? "hover:bg-white bg-blue-300 text-black"
                : "text-slate-900  bg-blue-300"
            } rounded-full `}
            onClick={() => setOpenWrite(true)}
          >
            <i className="">
              <PenIcon
                className={`${
                  theme === "dark"
                    ? "group-hover:stroke-black stroke-black"
                    : "group-hover:stroke-white stroke-black"
                } `}
              />
            </i>{" "}
            <span
              className={`hidden md:flex  ${
                theme === "dark"
                  ? "group-hover:text-black"
                  : "group-hover:text-white"
              }`}
            >
              Write
            </span>
          </Button>
        </div>
        <DialogFN
          type="component"
          setIsOpen={setOpenWrite}
          open={openWrite}
          component={<CreatePost setIsOpen={setOpenWrite} />}
        />
      </nav>
    </>
  );
}

export default Nav;
