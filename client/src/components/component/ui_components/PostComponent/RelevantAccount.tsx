import { useTheme } from "@/components/darkMode/theme-provider";
import { UserContext } from "@/context/userContext";
import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";

import { Ifollow } from "@/utils/type";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface RelevantAcc {
  comments: Icomment[];
  author: {
    name: string;
    profileImage: string;
    id: string;
    bio: string;
  };
}

export const RelevantAccount = ({ comments, author }: RelevantAcc) => {
  const { theme } = useTheme();
  const { user } = useContext(UserContext);
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
  console.log(user, "userdddd");
  const following = user?.following.map(
    (user: Ifollow) => user.followedUser.id,
  );
  const userFollowed = following?.map((user) => user);
  console.log(following, "following");
  const isFollow = userFollowed?.includes(author.id);
  console.log(isFollow, "follow");

  return (
    <div
      className={`${
        theme === "dark"
          ? "text-white bg-slate-900 border-2 border-slate-100"
          : "text-black bg-slate-50 shadow-xl"
      } text-white hidden bg--200 w-[75%]  h-1/2  top-0 right-0 lg:flex  flex-col rounded-xl `}
    >
      <h1 className="text-2xl font-bold text-center ">Relevent User </h1>
      <div
        className="  flex mt-6  bg-slate-900 hover:bg-slate-600 p-4 "
        onClick={() => navigate(`/profile/${author.id}`)}
      >
        <img
          src={author.profileImage}
          alt={`${author.name} profile picture`}
          className="w-14 h-14 rounded-full"
        />
        <div className="flex-1 flex flex-col">
          <p className="text-lg font-medium px-4 hover:bg-slate-600 flex  gap-2 h-full">
            {author.name}
            <span
              className={`text-sm  leading-8 ${
                theme === "dark" ? "text-blue-400   " : "text-blue-400 "
              }`}
            >
              Author
            </span>
          </p>

          <p className="text-base px-4 hover:bg-slate-600 flex flex-col items-start text-gray-400 justify-center h-full">
            {author.bio}
          </p>
        </div>
      </div>

      {uniqueData.slice(0, 4).map((comment) => (
        <div
          className="hover:bg-slate-600 text-lg odd:bg-slate-800 even:bg-slate-900 p-4 last:rounded-b-xl"
          key={comment.id}
        >
          <div
            className="flex gap "
            onClick={() => navigate(`/profile/${comment.id}`)}
          >
            <img
              src={comment.profileImage}
              alt={`${comment.name} profile picture`}
              className="w-14 h-14 rounded-full"
            />
            <div className="flex-1 flex flex-col ">
              <h1 className="text-lg font-medium px-4 hover:bg-slate-600 flex flex-col items-start justify-center h-full">
                {comment.name}
              </h1>
              <p className="text-base px-4 hover:bg-slate-600 flex flex-col items-start text-gray-400 justify-center h-full">
                {comment.bio}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
