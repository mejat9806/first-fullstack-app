import { useTheme } from "../../../darkMode/theme-provider";
import CommentInput from "./CommentInput";

const Comments = ({ postId }: { postId: string }) => {
  const { theme } = useTheme();

  return (
    <div className="w-full flex-col h-full flex items-start  ">
      <div
        className={`${
          theme === "dark"
            ? "text-white bg-slate-900 border-2 border-slate-100"
            : "text-black bg-slate-50"
        }  p-2 rounded-e-lg  w-full flex flex-col gap-2 h-full`}
      >
        <CommentInput postId={postId} />
      </div>
    </div>
  );
};

export default Comments;
