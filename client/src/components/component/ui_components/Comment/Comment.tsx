import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import { useState } from "react";
import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom";
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
import ReplyItem from "./reply/ReplyItem";
import PlusIcon from "@/components/SVG/PlusIcon";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface ICommentData {
  commentData: Icomment;
}

const Comment = ({ commentData }: ICommentData) => {
  const navigate = useNavigate();
  const [openReply, setOpenReply] = useState(false);
  const [openReplySection, setOpenReplySection] = useState(false);
  // console.log("comment data:", commentData); // Debugging statement
  const { postId, commentId } = useParams();
  console.log(postId, commentId);
  const profileImage = `${baseUrl}img/posts/${commentData.user.profileImage}`;
  console.log(commentData._id, "commment data");
  const queryClient = useQueryClient();

  return (
    <div className="">
      <div className="grid grid-cols-2 grid-cols-comment gap-2 relative">
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <img
                src={profileImage}
                className="md:h-12 md:w-12 w-9 h-9 rounded-full cursor-pointer"
                onClick={() => navigate(`/profile/${commentData.user.id}`)}
              />
            </HoverCardTrigger>
            <HoverCardContent className="m-0 absolute  -left-20">
              <HoverCardUI userId={commentData.user.id} />
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex flex-col">
          <p className="font-medium text-xs">{commentData.user.name}</p>
          <span className="font-thin text-slate-400">
            {formatDistanceToNow(new Date(commentData.timeStamp))} ago
          </span>
          <div className="w-full flex  p-2 mt-5">
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(commentData.commentText),
              }}
              className="w-full text-base "
            />

            {!openReply && (
              <div className="w-full flex justify-end">
                <Button onClick={() => setOpenReply(true)}>Reply</Button>
              </div>
            )}
          </div>
          <div className="">
            {openReply && (
              <AddReply
                commentId={commentData._id}
                setOpenReply={setOpenReply}
              />
            )}
          </div>
          <div className="justify-center flex ">
            {commentData.reply.length > 0 && (
              <button
                className="text-xs p-1 h-5 bg-transparent "
                onClick={() => setOpenReplySection(!openReplySection)}
              >
                {!openReplySection ? (
                  <PlusCircle className="w-5 stroke-black hover:stroke-slate-500" />
                ) : (
                  <MinusCircle className="w-5 stroke-black hover:stroke-slate-500" />
                )}
              </button>
            )}
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
                    <ReplyItem
                      key={reply._id}
                      replyData={reply}
                      postId={commentData.post}
                      commentId={commentData._id}
                    />
                  ))}
                <div className="w-full justify-center flex items-center">
                  {
                    <Button
                      onClick={() => {
                        console.log("click go to ");
                        queryClient.invalidateQueries({ queryKey: ["reply"] });
                        navigate(`/post/${postId}/${commentData._id}`, {
                          state: "reply",
                        });
                      }}
                    >
                      show all reply
                    </Button>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
