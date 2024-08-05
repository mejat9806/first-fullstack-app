import { useTheme } from "@/components/darkMode/theme-provider";

import { useNavigate } from "react-router-dom";
import { ReleventUserList } from "./ReleventUserList";
import { RelevantAcc } from "@/utils/type";

export const RelevantAccount = ({ comments, author }: RelevantAcc) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const seen = new Set();

  const uniqueData = comments
    .filter((item) => {
      const duplicate = seen.has(item.user._id);
      seen.add(item.user._id);
      return !duplicate;
    })

    .map((item) => ({
      id: item.user.id,
      name: item.user.name,
      profileImage: item.user.profileImage,
      bio: item.user.bio,
    }));

  const releventUser = uniqueData.filter((item) => {
    return item.id !== author.id;
  });

  return (
    <div
      className={`${
        theme === "dark"
          ? "text-white bg-slate-900 border-2 border-slate-100"
          : "text-black bg-slate-50 shadow-xl "
      }  hidden bg--200 w-[75%]  h-1/2  top-0 right-0 lg:flex  flex-col rounded-xl `}
    >
      <h1 className="text-2xl font-bold text-center ">Relevent User </h1>

      <div
        className={` flex mt-6    p-4 ${
          theme === "dark"
            ? "text-white bg-slate-900 hover:bg-slate-600 "
            : "text-black bg-slate-50 hover:bg-slate-300 shadow-xl "
        }`}
        onClick={() => navigate(`/profile/${author.id}`)}
      >
        <img
          src={author.profileImage}
          alt={`${author.name} profile picture`}
          className="w-14 h-14 rounded-full"
        />
        <div className="flex-1 flex flex-col">
          <p className="text-lg font-medium px-4  flex  gap-2 h-full">
            {author.name}
            <span
              className={`text-sm  leading-8 ${
                theme === "dark" ? "text-blue-400   " : "text-blue-400 "
              }`}
            >
              Author
            </span>
          </p>

          <p className="text-base px-4  flex flex-col items-start text-gray-400 justify-center h-full">
            {author.bio}
          </p>
        </div>
      </div>

      {releventUser.slice(0, 4).map((user) => (
        <ReleventUserList key={user.id} userData={user} author={author} />
      ))}
    </div>
  );
};
