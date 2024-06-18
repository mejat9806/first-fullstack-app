import { Outlet } from "react-router-dom";

export const ProfileLayout = () => {
  return (
    <div className="flex justify-center min-h-screen ">
      <div className="w-full md:max-w-4xl max-w-lg mx-3 ">
        <Outlet />
      </div>
    </div>
  );
};
