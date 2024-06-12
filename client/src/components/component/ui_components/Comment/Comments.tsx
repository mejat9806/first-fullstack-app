import React from "react";
import { useTheme } from "../../../darkMode/theme-provider";
import PostFooter from "../PostComponent/PostFooter";

const Comments = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full flex-col h-full flex items-start  ">
      <div
        className={`${
          theme === "dark"
            ? "text-white bg-slate-900 border-2 border-slate-100"
            : "text-black bg-slate-50"
        }  p-2 rounded-e-lg lg:max-w-[500px] w-full flex flex-col gap-2 h-full`}
      >
        Comments
      </div>
    </div>
  );
};

export default Comments;
