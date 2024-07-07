import { ReactElement } from "react";
import { UserListToFollow } from "../UserList/UserListToFollow";
import { useTheme } from "@/components/darkMode/theme-provider";

const PageUI = ({
  pageName,
  pageComponent,
}: {
  pageName: string;
  pageComponent: ReactElement;
}) => {
  const { theme } = useTheme();

  return (
    <div className=" flex justify-center items-start  md:ml-0 my-24">
      <div className="w-full sm:max-w-xl h-full ">
        <h1 className="text-4xl font-semibold">{pageName} </h1>
        {pageComponent}
      </div>
      <div
        className={`hidden w-[400px] h-fit border-2 lg:flex flex-col my-24 flex-1 max-w-[400px] ml-28  ${
          theme === "dark"
            ? "text-white   border-2 border-slate-100"
            : "text-black   border-2 border-slate-200"
        } shadow-md rounded-2xl`}
      >
        <UserListToFollow />
      </div>
    </div>
  );
};

export default PageUI;
