import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcnComponent/ui/hover-card";
import HoverCardUI from "../hoverCard/HoverCardUI";
import { useNavigate } from "react-router-dom";

interface IHoverCard {
  profileImage: string;
  userId: string;
}

export const HoverPic = ({ profileImage, userId }: IHoverCard) => {
  const navigate = useNavigate();

  return (
    <HoverCard>
      <HoverCardTrigger className="w-16">
        <img
          src={profileImage}
          className="md:h-12 md:w-12 w-9 h-9 rounded-full cursor-pointer  "
          // change this
          onClick={() => navigate(`/profile/${userId}`)}
        />
      </HoverCardTrigger>
      <HoverCardContent className="m-0 absolute -top-20 -left-20">
        <HoverCardUI userId={userId} />
      </HoverCardContent>
    </HoverCard>
  );
};
