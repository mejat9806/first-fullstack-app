import { useTheme } from "@/components/darkMode/theme-provider";
import { Iposts, UserType } from "@/utils/type";
import React from "react";
import { baseUrl } from "../../ui_components/PostComponent/PostItem";
import { useNavigate } from "react-router-dom";

interface IsmallSearch {
  type: "user" | "post";
  user?: UserType;
  post?: Iposts;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setResultVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SearchResultSmall = ({
  type,
  user,
  post,
  setSearchInput,
  setResultVisible,
}: IsmallSearch) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="">
      {type === "user" && (
        <div
          onClick={() => {
            navigate(`/profile/${user?.id}`);
            setSearchInput("");
            setResultVisible(false);
          }}
          className={`${
            theme === "dark"
              ? " hover:bg-slate-300/50"
              : "  hover:bg-slate-300/50"
          }  w-full py-5 px-3 `}
        >
          <div className="flex  items-center gap-2">
            <img
              src={`${baseUrl}img/posts/${user?.profileImage}`}
              alt={`${user?.name}'s profile`}
              className="h-5 w-5  rounded-full"
            />
            <h1>{user?.name}</h1>
          </div>
        </div>
      )}
      {type === "post" && (
        <div>
          {" "}
          <div
            onClick={() => {
              navigate(`/post/${post?.id}`);
              setSearchInput("");
              setResultVisible(false);
            }}
            className={`${
              theme === "dark"
                ? " hover:bg-slate-300/50"
                : "  hover:bg-slate-300/50"
            }  w-full py-5 px-3 `}
          >
            <div className="flex flex-col  gap-2">
              <h1>{post?.title}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
