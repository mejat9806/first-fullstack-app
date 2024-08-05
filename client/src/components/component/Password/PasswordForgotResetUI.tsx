import { useTheme } from "@/components/darkMode/theme-provider";
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
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div
        className={`md:grid md:grid-cols-2 shadow-2xl rounded-2xl   mx-3 w-full max-w-3xl ${
          theme === "dark"
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-black"
        }`}
      >
        <div className="hidden md:flex ">
          <img
            src={image}
            alt={alt}
            className="h-full object-cover rounded-2xl w-full "
          />
        </div>

        <div className="m-7  flex items-center  justify-center flex-col gap-4">
          <div className=" w-full ">
            <Button
              onClick={() => navigate(-1)}
              className={`hover:bg-slate-200 bg-transparent text-black  rounded-full h-10 w-10 p-0 hover:text-gray-400 ${
                theme === "dark"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-black"
              }`}
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
