import { useComment } from "@/features/api/Comment/useComment";
import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import { Button } from "@/shadcnComponent/ui/button";
import { ArrowBigLeft } from "lucide-react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Comment from "../Comment/Comment";
import LoadingPage from "../LoadingPage";
import { baseUrl } from "./PostItem";
import { dateFormat } from "@/utils/dateFormat";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";

const CommentLayout = () => {
  const comments = useOutletContext() as Icomment[];
  console.log(comments, "hero");
  const navigate = useNavigate();
  const params = useParams();

  const { commentData, loadingCommentData } = useComment(params.commentId);
  if (loadingCommentData) {
    return <LoadingPage className="h-fit" />;
  }
  const mustInclude: string[] = ["postId", "commentId"];
  const parramArray = Object.keys(params);
  const isIncludedParams = mustInclude.every((param) =>
    parramArray.includes(param),
  );
  console.log(commentData, "hello");
  return (
    <div className="flex flex-col gap-3">
      {isIncludedParams && (
        <div className="flex flex-col gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            className="hover:bg-slate-200 bg-slate-400 rounded-full h-10 w-10 p-0 hover:text-black"
          >
            <ArrowBigLeft className="scale-110" />
          </Button>
          <div className="grid grid-cols-2 grid-cols-comment gap-2 relative bg-blue-200/20 p-2 border-2 border-gray-500/20 rounded-lg">
            <div>
              <img
                src={`${baseUrl}/img/posts/${commentData?.user.profileImage}`}
                alt="profileImage"
                className="h-[50px] w-[50px] rounded-full"
              />
            </div>
            <div className="">
              <h1 className="">{commentData.user.name}</h1>
              <span className="font-thin text-slate-400">
                {formatDistanceToNow(new Date(commentData.timeStamp))} ago
              </span>{" "}
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(commentData.commentText),
                }}
                className="w-full text-base mt-5"
              />
            </div>
          </div>
        </div>
      )}
      <Outlet context={comments} />
    </div>
  );
};

export default CommentLayout;
