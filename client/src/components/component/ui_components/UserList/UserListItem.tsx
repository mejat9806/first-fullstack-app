import { useTheme } from "@/components/darkMode/theme-provider";
import { useToggleFollow } from "@/features/api/follow/useToggleFollow";
import { Button } from "@/shadcnComponent/ui/button";
import { Ifollow, UserType } from "@/utils/type";
import { useNavigate } from "react-router-dom";

export const UserListItem = ({
  userData,
  currentLogin,
}: {
  userData: UserType;
  currentLogin: UserType;
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { ToggleFollow, isToggleFollow } = useToggleFollow();
  const togglingFollow = ({ userId }: { userId: string }) => {
    ToggleFollow(userId);
  };
  const follower = currentLogin.followers.map(
    (user: Ifollow) => user.followedUser.id,
  );
  const userFollowed = follower.map((user) => user);

  const isFollow = userFollowed.includes(currentLogin.id);
  console.log(userFollowed, "isFollow");
  return (
    <div
      key={userData._id}
      className={` p-4 text-lg flex items-center justify-between  ${
        theme === "dark"
          ? "text-white  odd:bg-slate-600"
          : "text-black   odd:bg-slate-300"
      }`}
      onClick={() => navigate(`/profile/${userData._id}`)}
    >
      <div className="flex gap-3 items-center">
        <img
          src={userData.profileImage}
          alt={`${userData.name}'s image`}
          className="h-10 w-10 rounded-full"
        />

        <h1 className=" break-words w-full">{userData.name}</h1>
      </div>
      <div>
        <Button
          disabled={isToggleFollow}
          onClick={() => togglingFollow({ userId: userData.id })}
        >
          {isFollow ? "UnFollow" : "Follow"}
        </Button>
      </div>
    </div>
  );
};
