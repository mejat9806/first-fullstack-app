import { Form } from "@/shadcnComponent/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../FormInput";
import { Button } from "@/shadcnComponent/ui/button";
import { useTheme } from "@/components/darkMode/theme-provider";
import useCreateComment from "@/features/api/Comment/useCreateComment";

const FormSchema = z.object({
  commentText: z.string(),
});

const CommentInput = ({ postId }: { postId: string }) => {
  const { AddComment, isAddComment } = useCreateComment();
  const { theme } = useTheme();
  const [textInputType, setTextInputType] = useState<"rich" | "normal">(
    "normal",
  );
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
    form.reset();
  };
  const changeTextMode = () => {
    if (textInputType === "normal") {
      setTextInputType("rich");
    } else setTextInputType("normal");
  };

  console.log(textInputType);
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-2 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          textInput={textInputType}
          withCancel={true}
          form={form}
          placeholder={"Comment"}
          name="commentText"
          type="text"
          className="w-full"
          disabled={isAddComment}
        />
        {/* <div className="w-full flex justify-end items-end gap-4">
          <Button className="">Submit</Button>
        </div> */}

        {textInputType === "normal" && (
          <div className="w-full flex justify-end gap-3 mt-3">
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button>Submit</Button>
          </div>
        )}
        <Button
          className={` ${
            theme === "dark"
              ? " bg-slate-700 text-white hover:text-black"
              : "text-white hover:bg-slate-700"
          } w-10 text-xs rounded-full p-0 m-0 absolute  bottom-0`}
          onClick={changeTextMode}
          type="button"
        >
          {textInputType === "normal" ? "N" : "R"}
        </Button>
      </form>
    </Form>
  );
};

export default CommentInput;
