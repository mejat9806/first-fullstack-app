import { Button } from "@/shadcnComponent/ui/button";
import { IData } from "@/utils/type";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PasswordForgotResetUI = ({
  mainTitles,
  desc,
  form,
  image,
  alt,
}: IData) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="md:grid md:grid-cols-2 shadow-2xl rounded-lg bg-slate-50  mx-3 w-full max-w-3xl">
        <div className="hidden md:flex ">
          <img
            src={image}
            alt={alt}
            className="h-full object-cover w-full rounded-2xl"
          />
        </div>

        <div className="m-7  flex items-center justify-center flex-col gap-4">
          <div className=" w-full ">
            <Button
              onClick={() => navigate(-1)}
              className="hover:bg-slate-200 bg-transparent text-black  rounded-full h-10 w-10 p-0 hover:text-gray-400"
            >
              <ArrowBigLeft className="scale-110" />
            </Button>
          </div>

          <h1 className="text-2xl text-center font-extrabold">{mainTitles}</h1>
          <p className="text-center text-sm">{desc} </p>
          <div className="flex-1 justify-center">{form}</div>
        </div>
      </div>
    </div>
  );
};
