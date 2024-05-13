import Login from "@/component/Login";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen mx-10 ">
      <div className="bg-slate-100 p-10 rounded-3xl flex flex-col mb-24 justify-center items-center  shadow-2xl h-[500px] w-[400px] md:w-[500px] md:h-[500px] transition-all duration-150">
        <h1 className="text-3xl font-semibold uppercase">Sign In</h1>
        <div className="h-1 w-full bg-slate-300/50 my-5 rounded-xl"></div>
        <Login />
        <span>Dont have account ?</span>
        <Link to={"/register"} className="font-semibold hover:text-blue-950">
          {" "}
          Register here
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
