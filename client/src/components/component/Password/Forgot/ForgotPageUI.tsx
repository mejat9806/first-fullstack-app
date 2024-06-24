import { Button } from "@/shadcnComponent/ui/button";
import ForgotPassForm from "./ForgotPassForm";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

const ForgotPageUI = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-screen h-svh">
      <div className="md:grid md:grid-cols-2 shadow-2xl rounded-lg bg-slate-50 h-1/2 mx-3">
        <div className="hidden md:flex bg-red-700 "></div>
        <div className="m-7">
          <Button
            onClick={() => navigate(-1)}
            className="hover:bg-slate-200 bg-red-400 rounded-full h-10 w-10 p-0 hover:text-black"
          >
            <ArrowBigLeft className="scale-110" />
          </Button>
          <h1 className="text-2xl text-center font-extrabold">
            Forgot Password?
          </h1>
          <p className="text-center text-sm">
            Just input your email and we will work itf out😉
          </p>
          <div>
            <ForgotPassForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPageUI;
