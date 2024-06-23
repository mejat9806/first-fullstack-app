import React from "react";
import { Outlet } from "react-router-dom";

export const PostLayout = () => {
  return (
    <div className="max-w-4xl  min-w-[50%] h-full flex justify-center">
      <Outlet />
    </div>
  );
};
