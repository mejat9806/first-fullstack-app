import Register from "@/components/component/ui_components/Register";
import { useTheme } from "@/components/darkMode/theme-provider";
import { Button } from "@/shadcnComponent/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div
      className="flex justify-center items-center w-screen h-screen "
      // style={{
      //   backgroundImage: `url(https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
      // }}
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="grid md:grid-cols-2  sm:p-10 justify-center  items-center max-w-4xl  ">
        <div className="h-full object-cover w-full   hidden md:flex">
          <img
            src={
              "https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="signin image"
            className=" h-full object-cover w-full  md:rounded-l-2xl rounded-lg md:rounded-none hidden md:flex"
          />
        </div>
        <div className="w-full   transition-all duration-150 ">
          <div className="">
            {/* <div
            className=""
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <img src={backgroundImage} alt="register photo" className="" />
            <h1 className="">register</h1>
          </div> */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-black"
              } p-10 shadow-2xl w-full backdrop-blur-md md:rounded-r-2xl rounded-lg md:rounded-none`}
            >
              <Button
                onClick={() => navigate("/login", { replace: true })}
                className="hover:bg-slate-200 bg-transparent rounded-full h-10 w-10 p-0 hover:stroke-black"
              >
                <ArrowBigLeft
                  className={`scale-110 ${
                    theme === "dark"
                      ? " text-white hover:stroke-black"
                      : " text-black hover:stroke-white"
                  }`}
                />
              </Button>
              <h1
                className={`text-4xl font-bold mb-6 text-black ${
                  theme === "dark"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-black"
                }`}
              >
                <span className="">S</span>ign Up Here
              </h1>
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
