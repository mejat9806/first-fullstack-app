import { useState } from "react";
import { useTheme } from "../../../darkMode/theme-provider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateComment from "@/features/api/Comment/useCreateComment";
import CommentReplyInput from "./CommentReplyInput";
export const FormSchema = z.object({
  commentText: z.string(),
});
const CommentInput = ({ postId }: { postId: string }) => {
  const { AddComment, isAddComment } = useCreateComment();

  const { theme } = useTheme();
  const [textInputType, setTextInputType] = useState<"rich" | "normal">(
    "normal",
  );
  const [openCommentArea, setopenCommentArea] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      commentText: "",
    },
  });

  const onSubmit = (value: z.infer<typeof FormSchema>) => {
    AddComment(
      { postId: postId, commentText: value.commentText },
      { onSuccess: () => form.reset() },
    );
  };
  const onCancel = () => {
    setopenCommentArea(false);
    form.reset();
  };
  const changeTextMode = () => {
    if (textInputType === "normal") {
      setTextInputType("rich");
    } else setTextInputType("normal");
  };
  return (
    <div className=" flex-col h-fit flex items-start  ">
      <div
        className={`${
          theme === "dark"
            ? "text-white bg-slate-900 border-2 border-slate-100"
            : "text-black bg-slate-50"
        }  p-2 rounded-lg  w-full flex flex-col gap-2 h-fit`}
      >
        {!openCommentArea ? (
          <div>
            <div onClick={() => setopenCommentArea(true)}>
              <h1>add comment</h1>
            </div>
          </div>
        ) : (
          <CommentReplyInput
            name="commentText"
            form={form}
            onSubmit={onSubmit}
            onCancel={onCancel}
            changeTextMode={changeTextMode}
            textInputType={textInputType}
            isAddComment={isAddComment}
          />
        )}
      </div>
    </div>
  );
};

export default CommentInput;
