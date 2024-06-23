import { Ireply } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import { useState } from "react";
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
  postId: string;
}

const ReplyItem = ({ replyData, postId }: IreplyData) => {
  console.log("Reply Data:", replyData);
  const [openReply, setOpenReply] = useState(false);

  const navigate = useNavigate();

  if (!replyData) {
    return <LoadingPage />;
  }
  const profileImage = `${baseUrl}img/posts/${replyData.user?.profileImage}`;

  return (
    <div className="flex flex-col h-fit ml-3 relative ">
      <div className="flex justify-start items-center gap-4 relative">
        <HoverCard>
          <HoverCardTrigger className="">
            <img
              src={profileImage}
              className="md:h-12 md:w-12 w-9 h-9 rounded-full cursor-pointer"
              onClick={() => navigate(`/profile/${replyData.user?.id}`)}
            />
          </HoverCardTrigger>
          <HoverCardContent className="m-0 absolute ">
            <HoverCardUI userId={replyData.user?.id} />
          </HoverCardContent>
        </HoverCard>
        <p className="whitespace-break-spaces w-[90%] text-xs md:text-base">
          {replyData.user?.name}
        </p>
      </div>
      <div className="w-full flex  p-2 mt-5">
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(replyData.text),
          }}
          className=" w-full text-xs md:text-base"
        />
        {!openReply && (
          <Button onClick={() => setOpenReply(true)}>Reply</Button>
        )}
      </div>
      <div>
        {openReply && (
          <AddReply commentId={replyData._id} setOpenReply={setOpenReply} />
        )}
      </div>{" "}
      <div className="">
        {replyData.reply.slice(0, 1).map((replyToReply) => (
          <ReplyItem
            key={replyToReply._id}
            replyData={replyToReply}
            postId={postId}
          />
        ))}
        <div className="w-full justify-center flex items-center">
          {replyData.reply.length > 1 && (
            <Button onClick={() => navigate(`/post/${postId}`)}>
              show all reply
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
