/* eslint-disable react-hooks/rules-of-hooks */
import { useFetchDetails } from "@/features/api/Posts/PostDetail/useFetchDetail";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingPage from "../LoadingPage";
import FormInput from "../FormInput";
import { Form } from "@/shadcnComponent/ui/form";
import { Button } from "@/shadcnComponent/ui/button";
import useUpdatePost from "@/features/api/Posts/updatePost/useUpdatePost";
import { useTheme } from "@/components/darkMode/theme-provider";

const UpdatePost = ({
  setShowUpdateDialog,
}: {
  setShowUpdateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { singleDetailLoading, singleDetail } = useFetchDetails();
  const { theme } = useTheme();
  const { isUpdatingPost, updatePostMutation } = useUpdatePost();

  if (singleDetailLoading || !singleDetail || !singleDetail.data) {
    return <LoadingPage />;
  }
  const { id } = singleDetail.data;
  const FormSchema = z.object({
    title: z.string().min(1, { message: "Please enter a title" }),
    detail: z.string().min(5, { message: "Must have 10 characters" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      detail: "",
    },
  });
  const formSubmit = (value: z.infer<typeof FormSchema>) => {
    const formdata = new FormData();
    formdata.append("title", value.title);
    formdata.append("detail", value.detail);
    updatePostMutation(
      { formdata: formdata, postId: id },
      { onSuccess: () => setShowUpdateDialog(false) },
    );
  };
  return (
    <div>
      <h1
        className={`md:text-5xl text-2xl font-bold ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Update Post
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(formSubmit)}
          className="flex flex-col gap-y-6 "
        >
          <FormInput
            form={form}
            label={"title"}
            placeholder={"Post Title"}
            name="title"
            disabled={isUpdatingPost}
            type="text"
          />
          <FormInput
            form={form}
            textInput="rich"
            label={"detail"}
            placeholder={"Post detail"}
            name="detail"
            type="textArea"
            disabled={isUpdatingPost}
          />

          <div className="w-full flex justify-end mt-2">
            <Button type="submit" className="hover:bg-slate-600 ">
              {!isUpdatingPost ? "Update" : "... Loading"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePost;
