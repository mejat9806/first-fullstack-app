import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import { useState } from "react";
import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/shadcnComponent/ui/button";
import AddReply from "./reply/AddReply";
import ReplyItem from "./reply/ReplyItem";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@/components/darkMode/theme-provider";
// import { useComment } from "@/features/api/Comment/useComment";
// import LoadingPage from "../LoadingPage";
import { HoverPic } from "../HoverPic";

interface ICommentData {
  commentData: Icomment;
}

const Comment = ({ commentData }: ICommentData) => {
  const navigate = useNavigate();
  const [openReply, setOpenReply] = useState(false);
  const [openReplySection, setOpenReplySection] = useState(false);
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const { postId } = useParams();
  //

  // const { commentData: commentReplydata, loadingCommentData } = useComment();

  // if (loadingCommentData) {
  //   return <LoadingPage className="h-20" />;
  // }

  const text = commentData?.commentText;
  //
  const profileImage = `${commentData.user.profileImage}`;

  return (
    <div className="relative">
      <div className="grid  grid-cols-comment gap-6 ml-5 border-2 p-2 rounded-xl border-gray-400/50">
        <div>
          <HoverPic profileImage={profileImage} userId={commentData.user.id} />
        </div>
        <div className="flex flex-col ">
          <p className="font-medium text-xs">{commentData.user.name}</p>
          <span className="font-thin text-slate-400">
            {formatDistanceToNow(new Date(commentData.timeStamp))} ago
          </span>
          <div className="w-full flex  p-2 mt-5">
            <div className="flex flex-col w-full">
              {commentData.commentId && <p> reply to {text}</p>}

              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(commentData.commentText),
                }}
                className="w-full text-base  "
              />
            </div>

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
                className="text-xs p-1 h-5 bg-transparent my-2 "
                onClick={() => setOpenReplySection(!openReplySection)}
              >
                {!openReplySection ? (
                  <PlusCircle
                    className={`${
                      theme === "dark"
                        ? "stroke-white hover:stroke-slate-600"
                        : "stroke-black hover:stroke-slate-500"
                    } w-5  `}
                  />
                ) : (
                  <MinusCircle
                    className={`${
                      theme === "dark"
                        ? "stroke-white hover:stroke-slate-600"
                        : "stroke-black hover:stroke-slate-500"
                    } w-5  `}
                  />
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
              <div className="w-full  relative flex flex-col gap-3">
                {commentData.reply &&
                  commentData.reply
                    .slice(0, 4)
                    .map((reply) => (
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
