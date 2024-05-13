import { Link, useLocation } from "react-router-dom";

import { BookMarked, CompassIcon, HomeIcon, PenIcon } from "lucide-react";

const navitems = [
  {
    name: "Home",
    icons: <HomeIcon />,
    link: "/",
  },
  {
    name: "Explore",
    icons: <CompassIcon />,
    link: "/explore",
  },
  {
    name: "Write",
    icons: <PenIcon />,
    link: "/newPost",
  },
  {
    name: "Bookmark",
    icons: <BookMarked />,
    link: "#",
  },
];

function Nav() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav className="flex flex-col justify-between  items-center h-screen bg-slate-200 w-[50px] md:w-[140px]  backdrop-blur-2xl	fixed   transition-all duration-150 mt-6">
      <div className="flex flex-col gap-5  h-1/3 mt-10 transition-all duration-150">
        {navitems.map((navitem) => (
          <Link
            to={navitem.link}
            className={`flex gap-2 hover:scale-105 p-3 mx-10 md:w-32 transition-transform duration-150 hover:bg-white/40 rounded-lg  ${
              location.pathname === navitem.link ? "bg-white/40 border-1 " : ""
            }`}
            key={navitem.name}
          >
            <i className=" hover:bg-white/40 ">{navitem.icons}</i>{" "}
            <span className="hidden md:flex transition-all duration-150">
              {navitem.name}
            </span>
          </Link>
        ))}
      </div>
      {/* <button className="w-10 mt-32 mb-10 flex justify-center ">
        <LogOut className="rotate-180" />
      </button> */}
      {/* <div className=" mb-14 capitalize">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="focus:bg-slate-500/20" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white/20 backdrop-blur-2xl drop-shadow-2xl ml-5 ">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/dashboard" className="p-0">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/setting" className="p-0">
                Setting
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Contact the Dev</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </nav>
  );
}

export default Nav;
