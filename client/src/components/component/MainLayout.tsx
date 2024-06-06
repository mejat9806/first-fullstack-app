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
      } mx-auto w-full overflow-x-hidden`}
    >
      <HoroBar />
      <Nav />
      <div className="md:grid md:grid-cols-profile  ">
        <div className=" ml-16 mr-2 pt-5 h-full col-start-2  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
