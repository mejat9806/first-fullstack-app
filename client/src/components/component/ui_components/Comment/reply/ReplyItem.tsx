import { Ireply } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import React, { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcnComponent/ui/hover-card";
import { baseUrl } from "../../PostComponent/PostItem";
import { useNavigate } from "react-router-dom";
import HoverCardUI from "@/components/component/hoverCard/HoverCardUI";
import LoadingPage from "../../LoadingPage";
import DOMPurify from "dompurify";
import AddReply from "./AddReply";
import { Button } from "@/shadcnComponent/ui/button";

interface IreplyData {
  replyData: Ireply;
}

const ReplyItem = ({ replyData }: IreplyData) => {
  console.log("Reply Data:", replyData);
  const [openReply, setOpenReply] = useState(false);

  const navigate = useNavigate();

  if (!replyData) {
    return <LoadingPage />;
  }
  const profileImage = `${baseUrl}img/posts/${replyData.user?.profileImage}`;

  return (
    <div className="flex w-full flex-col gap-3   ">
      <div className="flex justify-start items-center gap-4 relative">
        <HoverCard>
          <HoverCardTrigger className="w-12">
            <img
              src={profileImage}
              className="md:h-12 md:w-12 w-9 h-9 rounded-full cursor-pointer"
              onClick={() => navigate(`/profile/${replyData.user?.id}`)}
            />
          </HoverCardTrigger>
          <HoverCardContent className="m-0 absolute -top-20 -left-20">
            <HoverCardUI userId={replyData.user?.id} />
          </HoverCardContent>
        </HoverCard>
        <p className="whitespace-break-spaces w-[90%]">
          {replyData.user?.name}
        </p>
      </div>
      <div className="w-full flex  p-2 mt-5">
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(replyData.text),
          }}
          className=" w-full"
        />
        {!openReply && (
          <div className="w-full flex justify-end">
            <Button onClick={() => setOpenReply(true)}>Reply</Button>
          </div>
        )}
      </div>
      <div>
        {openReply && (
          <AddReply commentId={replyData._id} setOpenReply={setOpenReply} />
        )}
      </div>{" "}
      <div className="ml-5">
        {replyData.reply.map((replyToReply) => (
          <ReplyItem key={replyToReply._id} replyData={replyToReply} />
        ))}
      </div>
    </div>
  );
};

export default ReplyItem;
