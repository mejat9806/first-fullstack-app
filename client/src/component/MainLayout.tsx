import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import HoroBar from "./horoBar";

function MainLayout() {
  return (
    <div>
      <HoroBar />
      <Nav />
      <div className="ml-[6rem] md:ml-[10rem]">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
