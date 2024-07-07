import { useTheme } from "@/components/darkMode/theme-provider";
import { UserContext } from "@/context/userContext";
import { useToggleFollow } from "@/features/api/follow/useToggleFollow";
import { Button } from "@/shadcnComponent/ui/button";
import { Ifollow, RelevantAccountUserInPOst } from "@/utils/type";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";

export const ReleventUserList = ({
  userData,
}: {
  userData: RelevantAccountUserInPOst;
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { ToggleFollow, isToggleFollow } = useToggleFollow();
  if (!user) {
    return <LoadingPage />;
  }
  const following = user?.following.map(
    (user: Ifollow) => user.followedUser.id,
  );
  const userFollowed = following?.map((user) => user);
  console.log(userFollowed, "following");
  const userId = userData.id;
  const isFollow = userFollowed.includes(userId);
  const togglingFollow = ({ userId }: { userId: string }) => {
    ToggleFollow(userId);
  };
  console.log(userData.id, isFollow, user.following, "isFollow");
  return (
    <div
      className={` text-lg flex justify-between p-4 last:rounded-b-xl ${
        theme === "dark"
          ? "odd:bg-slate-800 even:bg-slate-900 hover:bg-slate-600"
          : "odd:bg-slate-200 even:bg-slate-100 hover:bg-slate-300"
      }`}
      key={userData.id}
    >
      <div
        className="flex gap "
        onClick={() => navigate(`/profile/${userData.id}`)}
      >
        <img
          src={userData.profileImage}
          alt={`${userData.name} profile picture`}
          className="w-14 h-14 rounded-full"
        />
        <div className="flex-1 flex flex-col ">
          {userData.id === user?.id ? (
            <p className="text-sm font-medium px-4  flex  gap-2 h-full">
              {userData.name}
              <span
                className={`text-sm  leading-8 ${
                  theme === "dark" ? "text-blue-400   " : "text-blue-400 "
                }`}
              >
                Author
              </span>
            </p>
          ) : (
            <p className="text-base font-medium px-4 flex flex-col items-start justify-center h-full">
              {userData.name}
            </p>
          )}
          <p className="text-base px-4  flex flex-col items-start text-gray-400 justify-center h-full">
            {userData.bio}
          </p>
        </div>
      </div>
      <Button
        onClick={() => togglingFollow({ userId: userData.id })}
        disabled={isToggleFollow}
      >
        {isFollow ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};
