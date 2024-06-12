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
      <Nav />
      <div className=" flex justify-center w-full items-center mt-14 ">
        <div className=" flex justify-center items-center md:ml-24 md:mr-2 pt-5 w-full h-full col-start-2  ml-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
