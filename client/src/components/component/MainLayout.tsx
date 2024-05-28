import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import HoroBar from "./horoBar";
import { useTheme } from "../darkMode/theme-provider";
function MainLayout() {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-svh ${theme === "dark" ? "bg-black" : "bg-slate-100"}`}
    >
      <HoroBar />
      <Nav />
      <div className="md:mx-40 ml-20 mr-6 pt-24 h-full ">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
