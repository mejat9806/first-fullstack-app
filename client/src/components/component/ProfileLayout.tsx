import React from "react";
import { Outlet } from "react-router-dom";

export const ProfileLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
