import React from "react";
import Login from "@/components/component/Login";
import { Link } from "react-router-dom";
const LoginUI = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <div className="bg-slate-100 px-10 h-full rounded-3xl flex flex-col  justify-center items-center  shadow-2xl    transition-all duration-150 w-full max-w-xl">
        <h1 className="text-3xl font-semibold uppercase">Sign In</h1>
        <div className="h-1 w-full bg-slate-300/50 my-5 rounded-xl"></div>
        <Login />
        <span>Dont have account ?</span>
        <Link to={"/register"} className="font-semibold hover:text-blue-500">
          Register here
        </Link>
        <Link
          to={"/forgotPassword"}
          className="font-semibold hover:text-blue-500"
        >
          Forgot Password
        </Link>
      </div>
    </div>
  );
};

export default LoginUI;
