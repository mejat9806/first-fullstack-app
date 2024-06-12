import { useTheme } from "@/components/darkMode/theme-provider";
import React from "react";

const LoadingPage = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`h-full w-full flex justify-center items-center absolute top-0 left-0 z-50 ${
        theme ? "bg-white" : "bg-black "
      }`}
    >
      <div className="loader "></div>
    </div>
  );
};

export default LoadingPage;
