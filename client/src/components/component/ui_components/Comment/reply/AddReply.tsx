import CommentReplyInput from "../CommentReplyInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReply } from "@/features/api/reply/useReply";
import { useParams } from "react-router-dom";
export const FormSchema = z.object({
  text: z.string().min(1, "need at least 1 character"),
});

const AddReply = ({
  commentId,
  setOpenReply,
}: {
  commentId: string;
  setOpenReply: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isReply, mutateReply } = useReply();
  const { postId } = useParams();
  const [textInputType, setTextInputType] = useState<"rich" | "normal">(
    "normal",
  );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (value: z.infer<typeof FormSchema>) => {
    mutateReply(
      {
        commentId: commentId,
        postId: postId as string,
        commentText: value.text,
      },
      {
        onSuccess: () => {
          form.reset();
          setOpenReply(false);
        },
      },
    );
  };
  const onCancel = () => {
    setOpenReply(false);
    form.reset();
  };
  const changeTextMode = () => {
    if (textInputType === "normal") {
      setTextInputType("rich");
    } else setTextInputType("normal");
  };
  return (
    <div className=" border-black p-2 ">
      {" "}
      <CommentReplyInput
        name="text"
        form={form}
        onSubmit={onSubmit}
        onCancel={onCancel}
        changeTextMode={changeTextMode}
        textInputType={textInputType}
        isAddComment={isReply}
      />
    </div>
  );
};

export default AddReply;
