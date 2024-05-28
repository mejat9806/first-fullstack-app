import Login from "@/components/component/Login";
import { Link } from "react-router-dom";
import { useTheme } from "../darkMode/theme-provider";
const LoginUI = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <div
        className={`${
          theme === "dark"
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-black"
        } p-10 h-full rounded-r-2xl flex flex-col  justify-center items-center  shadow-2xl    transition-all duration-150 w-full max-w-xl gap-2`}
      >
        <h1 className="text-5xl font-semibold uppercase">Sign In</h1>
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
