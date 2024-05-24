import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import HoroBar from "./horoBar";

function MainLayout() {
  return (
    <div className="mx">
      <HoroBar />
      <Nav />
      <div className="md:mx-40 ml-16 mr-6 pt-24">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
