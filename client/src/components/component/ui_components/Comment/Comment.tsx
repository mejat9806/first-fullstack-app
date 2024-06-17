import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import React, { useState } from "react";
import Reply from "./reply/ReplyItem";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../PostComponent/PostItem";
import { formatDistanceToNow } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcnComponent/ui/hover-card";
import HoverCardUI from "../../hoverCard/HoverCardUI";
import { Button } from "@/shadcnComponent/ui/button";
import AddReply from "./reply/AddReply";

interface ICommentData {
  commentData: Icomment;
}

const Comment = ({ commentData }: ICommentData) => {
  const navigate = useNavigate();
  const [openReply, setOpenReply] = useState(false);
  const [openReplySection, setOpenReplySection] = useState(false);

  const profileImage = `${baseUrl}img/posts/${commentData.user.profileImage}`;

  console.log("comment data:", commentData); // Debugging statement

  return (
    <div className="">
      <div className="grid grid-cols-2 grid-cols-comment gap-2">
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <img
                src={profileImage}
                className="md:h-12 md:w-12 w-9 h-9 rounded-full cursor-pointer"
                onClick={() => navigate(`/profile/${commentData.user.id}`)}
              />
            </HoverCardTrigger>
            <HoverCardContent className="m-0 absolute -top-20 -left-20">
              <HoverCardUI userId={commentData.user.id} />
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex flex-col">
          <p className="font-medium">{commentData.user.name}</p>
          <span className="font-thin text-slate-400">
            {formatDistanceToNow(new Date(commentData.timeStamp))} ago
          </span>
          <div className="w-full flex  p-2 mt-5">
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(commentData.commentText),
              }}
              className="w-full "
            />
            {!openReply && (
              <div className="w-full flex justify-end">
                <Button onClick={() => setOpenReply(true)}>Reply</Button>
              </div>
            )}
          </div>
          <div>
            {openReply && (
              <AddReply
                commentId={commentData._id}
                setOpenReply={setOpenReply}
              />
            )}
          </div>
          <div className="justify-center flex ">
            <Button
              className=""
              onClick={() => setOpenReplySection(!openReplySection)}
            >
              Show replies
            </Button>
          </div>
          <div
            className={`w-full overflow-hidden transition-all duration-300 ease-in-out transform ${
              openReplySection
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {openReplySection && (
              <div className="w-full  ">
                {commentData.reply &&
                  commentData.reply.map((reply) => (
                    <Reply key={reply._id} replyData={reply} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
