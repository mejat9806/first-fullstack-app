import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/shadcnComponent/ui/form";

import { z } from "zod";
import FormInputCreatePost from "./FormInputCreatePost";
import { Button } from "@/shadcnComponent/ui/button";
import { useCreatePost } from "@/features/api/Posts/createPost/useCreatePost";

const CreatePostInput = () => {
  const { loadingPost, createPost } = useCreatePost();
  const FormSchema = z.object({
    title: z.string().min(1, { message: "Please enter a title" }),
    detail: z.string().min(10, { message: "Must have 10 characters" }),
    image: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      detail: "",
      image: "",
    },
  });
  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    const { detail, title } = values;
    // const txttoStore = "<p>" + detail.replace(/\n/g, "</p>\n<p>") + "</p>";
    const data = { title, detail };
    createPost(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
        <FormInputCreatePost
          form={form}
          label={"title"}
          placeholder={"Post Title"}
          name="title"
          type="text"
        />
        <FormInputCreatePost
          form={form}
          label={"detail"}
          placeholder={"Post detail"}
          name="detail"
          type="textArea"
        />
        <FormInputCreatePost
          form={form}
          label={"image"}
          name="image"
          type="file"
        />

        <div className="w-full flex justify-end mt-2">
          <Button type="submit" className="hover:bg-slate-600 ">
            {loadingPost ? "loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostInput;
