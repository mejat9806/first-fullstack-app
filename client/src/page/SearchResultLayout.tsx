import { useTheme } from "@/components/darkMode/theme-provider";
import { Button } from "@/shadcnComponent/ui/button";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

const SearchResultLayout = () => {
  const { state, pathname, search } = useLocation();
  const nagivate = useNavigate();
  console.log(state);
  const { theme } = useTheme();
  console.log(search);
  return (
    <div className="w-dvw flex justify-center items-center flex-col mt-16 overflow-y-hidden ">
      <div className="min-w-[50%]">
        <h1
          className={`${
            theme === "dark" ? "text-white " : "text-black "
          } text-4xl font-bold`}
        >
          Search Result
        </h1>
        <div className=" max-w-xl flex gap-3 mt-6 justify-start items-start ">
          <Button
            onClick={() => nagivate(`/search/post${search}`, { state: state })}
            className={`rounded-full ${
              pathname === "/search/post"
                ? ` ${
                    theme === "dark"
                      ? "text-white hover:text-black bg-slate-500 hover:bg-slate-100"
                      : "text-black bg-blue-200 hover:text-white hover:bg-slate-600"
                  } `
                : ` bg-transparent ${
                    theme === "dark"
                      ? "text-white hover:bg-blue-200 hover:text-black hover:bg-slate-200"
                      : "text-black  hover:text-white"
                  } `
            } `}
          >
            Post{" "}
          </Button>
          <Button
            onClick={() => nagivate(`/search/user${search}`, { state: state })}
            className={`rounded-full ${
              pathname === "/search/user"
                ? ` ${
                    theme === "dark"
                      ? "text-white hover:text-black bg-slate-500 hover:bg-slate-100"
                      : "text-black bg-blue-200 hover:text-white hover:bg-slate-600"
                  } `
                : ` bg-transparent ${
                    theme === "dark"
                      ? "text-white hover:bg-blue-200 hover:text-black hover:bg-slate-200"
                      : "text-black  hover:text-white"
                  } `
            } `}
          >
            User{" "}
          </Button>
          <Button
            onClick={() =>
              nagivate(`/search/comment${search}`, { state: state })
            }
            className={`rounded-full ${
              pathname === "/search/comment"
                ? ` ${
                    theme === "dark"
                      ? "text-white hover:text-black bg-slate-500 hover:bg-slate-100"
                      : "text-black bg-blue-200 hover:text-white hover:bg-slate-600"
                  } `
                : ` bg-transparent ${
                    theme === "dark"
                      ? "text-white hover:bg-blue-200 hover:text-black hover:bg-slate-200"
                      : "text-black  hover:text-white"
                  } `
            } `}
          >
            Comment{" "}
          </Button>
        </div>
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SearchResultLayout;
