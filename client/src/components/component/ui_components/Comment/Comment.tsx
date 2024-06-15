import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import React from "react";
import Reply from "./reply/Reply";
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

interface ICommentData {
  commentData: Icomment;
}

const Comment = ({ commentData }: ICommentData) => {
  const navigate = useNavigate();
  const profileImage = `${baseUrl}img/posts/${commentData.user.profileImage}`;
  console.log(commentData);
  return (
    <div className="">
      <div className="flex gap-2 ">
        <HoverCard>
          <HoverCardTrigger>
            <img
              src={profileImage}
              className="md:h-12 md:w-12 w-9 h-9 rounded-full cursor-pointer  "
              // change this
              onClick={() => navigate(`/profile/${commentData.user.id}`)}
            />
          </HoverCardTrigger>
          <HoverCardContent className="m-0 absolute -top-20 -left-20">
            <HoverCardUI userId={commentData.user.id} />
          </HoverCardContent>
        </HoverCard>
        <div className="flex  flex-col">
          <p className="font-medium">{commentData.user.name}</p>
          <span className="font-thin text-slate-400">
            {formatDistanceToNow(new Date(commentData.timeStamp))} ago
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[25px_1fr] xs:grid-cols-[32px_1fr] relative">
        <div className="absolute top-0 left-0 bottom-0 w-10 xs:w-16 flex justify-center items-center z-0 cursor-pointer group mb-sm">
          <div className="w-[1px] h-full group-hover:bg-slate-100 bg-white"></div>
        </div>

        <div className="w-full">
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(commentData.commentText),
            }}
            className=" mt-5 ml-10"
          ></p>
        </div>
        <div className="w-full mt-11">
          {commentData &&
            commentData.reply.map((reply) => (
              <Reply key={reply._id} replyData={reply} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
