import { Ireply } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcnComponent/ui/hover-card";
import { baseUrl } from "../../PostComponent/PostItem";
import { useNavigate } from "react-router-dom";
import HoverCardUI from "@/components/component/hoverCard/HoverCardUI";
interface IreplyData {
  replyData: Ireply;
}

const Reply = ({ replyData }: IreplyData) => {
  console.log(replyData.user);
  const navigate = useNavigate();
  const profileImage = `${baseUrl}img/posts/${replyData.user.profileImage}`;
  console.log(profileImage);
  return (
    <div className="flex w-full flex-col gap-3 ml-7 mt-4">
      <div className="flex justify-start items-center gap-4">
        <img
          src={profileImage}
          className="h-10 w-10  rounded-full cursor-pointer  "
          // change this
          onClick={() => navigate(`/profile/${replyData.user.id}`)}
        />
        <p className="whitespace-break-spaces w-[90%]">{replyData.user.name}</p>
      </div>

      <p className="whitespace-break-spaces w-[90%]">{replyData.text}</p>
    </div>
  );
};

export default Reply;
