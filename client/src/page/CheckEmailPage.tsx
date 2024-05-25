import React from "react";

const CheckEmailPage = () => {
  return (
    <div className="flex justify-center items-center w-screen h-svh">
      <div className="md:grid md:grid-cols-2 shadow-2xl rounded-lg bg-slate-50 h-fit mx-3">
        <div className="hidden md:flex bg-red-700 "></div>
        <div className="m-7">
          <h1 className="text-2xl text-center font-extrabold">
            Check your Email 📧
          </h1>
          <p className="text-center text-md">
            We just send you the details for the next stage
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CheckEmailPage;
