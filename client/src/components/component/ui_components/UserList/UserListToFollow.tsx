import { useGetAllUser } from "@/features/api/User/useGetAllUser";
import LoadingPage from "../LoadingPage";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { Ifollow, UserType } from "@/utils/type";
import { UserListItem } from "./UserListItem";
import { PostSkeleton } from "../PostComponent/PostSkeleton";

export const UserListToFollow = () => {
  const { allUserData, isLoadingAllUser } = useGetAllUser();

  const { user } = useContext(UserContext);
  if (isLoadingAllUser || !allUserData) {
    return <LoadingPage />;
  }

  if (!user) {
    return <PostSkeleton />;
  }
  const removeLoginUser = allUserData.data.filter(
    (userList) => userList.id !== user._id,
  );
  const userHasFollowed =
    user.following?.map((user: Ifollow) => user.followedUser?.id) || [];

  const userFollowedLoginUser: UserType[] = [];

  removeLoginUser.forEach((userFollowed) => {
    if (!userHasFollowed.includes(userFollowed.id))
      return userFollowedLoginUser.push(userFollowed);
  });
  console.log(userFollowedLoginUser, "userFollowedLoginUser");

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-xl font-semibold px-4 pt-3">User to Follow</h1>
      <div className="divide-slate-600 divide-y-2">
        {userFollowedLoginUser.slice(0, 4).map((userData) => (
          <UserListItem
            key={userData.id}
            userData={userData}
            currentLogin={user}
          />
        ))}
      </div>
    </div>
  );
};
