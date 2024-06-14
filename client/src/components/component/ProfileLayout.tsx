import React from "react";
import { Outlet } from "react-router-dom";

export const ProfileLayout = () => {
  return (
    <div className="w-[300px] sm:w-[90%] md:w-[90%] ml-8">
      <Outlet />
    </div>
  );
};
