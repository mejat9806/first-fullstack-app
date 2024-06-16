import { Form } from "@/shadcnComponent/ui/form";
import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import FormInput from "../FormInput";
import { Button } from "@/shadcnComponent/ui/button";
import { useTheme } from "@/components/darkMode/theme-provider";
import { useState } from "react";

interface ICommentInput<T extends FieldValues> {
  form: UseFormReturn<T, undefined>;
  onSubmit: SubmitHandler<T>;
  onCancel: () => void;
  changeTextMode: () => void;
  textInputType: "rich" | "normal";
  name: Path<T>;
  isAddComment: boolean;
}
const CommentReplyInput = <T extends FieldValues>({
  form,
  onSubmit,
  onCancel,
  name,
  isAddComment,
}: ICommentInput<T>) => {
  const { theme } = useTheme();
  const [textInputType, setTextInputType] = useState<"normal" | "rich">(
    "normal",
  );

  const changeTextMode = () => {
    setTextInputType((prevType: string) =>
      prevType === "normal" ? "rich" : "normal",
    );
  };

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
          name={name}
          type="text"
          className="w-full"
          disabled={isAddComment}
        />
        {textInputType === "normal" && (
          <div className="w-full flex justify-end gap-3 mt-3">
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        )}
        <Button
          className={`${
            theme === "dark"
              ? "bg-slate-700 text-white hover:text-black"
              : "text-white hover:bg-slate-700"
          } w-10 text-xs rounded-full p-0 m-0 absolute bottom-0`}
          onClick={changeTextMode}
          type="button"
        >
          {textInputType === "normal" ? "N" : "R"}
        </Button>
      </form>
    </Form>
  );
};

export default CommentReplyInput;
