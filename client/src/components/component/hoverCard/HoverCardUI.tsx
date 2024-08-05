import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";

import LoadingPage from "../ui_components/LoadingPage";
import { dateFormat } from "@/utils/dateFormat";
import { Button } from "@/shadcnComponent/ui/button";
import { useToggleFollow } from "@/features/api/follow/useToggleFollow";
import { Ifollow } from "@/utils/type";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

const HoverCardUI = ({ userId }: { userId: string }) => {
  const { ToggleFollow, isToggleFollow } = useToggleFollow();
  const { user } = useContext(UserContext);

  const { isError, isGetProfile, userProfileData } = useGetPosterProfile({
    userId,
  });
  if (isGetProfile || !userProfileData) {
    return <LoadingPage className="h-fit" />;
  }
  if (isError) {
    return <div>something goes wrong</div>;
  }
  if (!user) {
    return <LoadingPage className="h-fit" />;
  }
  const userID = user.id;
  const following = userProfileData.followers.map(
    (follow: Ifollow) => follow.user.id,
  );

  const isFollow = following.includes(userID);
  const togglingFollow = () => {
    ToggleFollow(userProfileData.id);
  };

  const profileImage = `${
    userProfileData?.profileImage ?? //return leftside if it not null/undefiend .if null/undifined it will return the right
    "/img/userImage/defaultUser.svg"
  }`;
  const dateJoin = userProfileData.joinDate.split("T")[0];

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-4 flex-col">
        <img
          src={profileImage}
          alt="profileImage"
          className="h-[50px] w-[50px] rounded-full"
        />
        <div>
          <h1 className="font-medium">{userProfileData?.name}</h1>
          <p>{userProfileData.bio}</p>
          <p>
            <span className="font-semibold">{dateFormat(dateJoin, false)}</span>
          </p>
        </div>
      </div>
      <div>
        {userID === userProfileData.id ? (
          <></>
        ) : (
          <Button disabled={isToggleFollow} onClick={togglingFollow}>
            {isFollow ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HoverCardUI;
