import { Link, useLocation } from "react-router-dom";

import { BookMarked, CompassIcon, HomeIcon, PenIcon } from "lucide-react";
import { useTheme } from "../darkMode/theme-provider";

const navitems = [
  {
    name: "Home",
    icons: <HomeIcon className=" hover:stroke-slate-700 " />,
    link: "/",
  },
  {
    name: "Explore",
    icons: <CompassIcon className=" hover:stroke-slate-700 " />,
    link: "/explore",
  },
  {
    name: "Bookmark",
    icons: <BookMarked className=" hover:stroke-slate-700 " />,
    link: "#",
  },
];

function Nav() {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <nav
      className={`flex flex-col justify-between  items-center h-screen  w-[60px] md:w-[140px]  backdrop-blur-2xl	fixed   transition-all duration-150 mt-10 ${
        theme === "dark"
          ? "text-white bg-black border-r-2 border-r-slate-100"
          : "text-black bg-slate-100 border-r-2 border-r-slate-900/10"
      }`}
    >
      <div className="flex flex-col gap-5  h-1/3 mt-10 transition-all duration-150">
        {navitems.map((navitem) => (
          <Link
            aria-label="label"
            to={navitem.link}
            className={`flex gap-2 hover:scale-105 p-3 mx-10 md:w-32 transition-transform duration-150  hover:text-slate-400  rounded-lg  ${
              location.pathname === navitem.link ? "bg-white/40 border-1 " : ""
            }`}
            key={navitem.name}
          >
            <i>{navitem.icons}</i>{" "}
            <span className="hidden md:flex transition-all duration-150">
              {navitem.name}
            </span>
          </Link>
        ))}
        <Link
          aria-label="label"
          to={"/newPost"}
          className="flex gap-2 hover:scale-105 p-3 mx-10 md:w-32 transition-transform duration-150   bg-white rounded-full text-slate-900"
        >
          <i>
            <PenIcon className=" hover:stroke-slate-700 stroke-black" />
          </i>{" "}
          <span className="hidden md:flex transition-all duration-150">
            Write
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
