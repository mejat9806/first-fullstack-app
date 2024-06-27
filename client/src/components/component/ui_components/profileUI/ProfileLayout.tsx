import { Outlet } from "react-router-dom";
import ProfileUI from "./ProfileUI";

export const ProfileLayout = () => {
  return (
    <div className="flex   flex-col w-full flex flex-col justify-center items-center">
      <ProfileUI />
      <div className="w-full md:max-w-4xl max-w-lg mx-3 mb-10 ">
        <Outlet />
      </div>
    </div>
  );
};
