import React from "react";
import Post from "../PostComponent/PostArea";

export const PopularUI = () => {
  return (
    <div className=" flex justify-center items-center w-full  md:ml-0 my-24">
      <div className="w-[350px] sm:max-w-xl h-full ">
        <h1 className="text-4xl font-semibold">Popular </h1>
        <Post fetchType="popular" />
      </div>
    </div>
  );
};
