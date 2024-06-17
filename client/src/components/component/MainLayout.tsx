import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import HoroBar from "./horoBar";
import { useTheme } from "../darkMode/theme-provider";
function MainLayout() {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black" : "bg-slate-100"
      } mx-auto w-full overflow-hidden`}
    >
      <HoroBar />
      <div className=" flex relative">
        <Nav />
        <div className="flex-grow flex justify-center items-center md:mt-16">
          <Outlet />
        </div>
      </div>
      {/*  <HoroBar />
      <Nav />
      <div className=" flex md:justify-center w-full md:items-center mt-14 ">
        <div className=" flex justify-center items-center md:ml-24 md:mr-2 pt-5 w-full h-full col-start-2  ">
          <Outlet />
        </div>
      </div> */}
    </div>
  );
}

export default MainLayout;
