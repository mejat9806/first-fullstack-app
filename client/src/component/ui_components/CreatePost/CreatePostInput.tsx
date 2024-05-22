import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnComponent/ui/form";

import { z } from "zod";
import FormInputCreatePost from "./FormInputCreatePost";
import { Button } from "@/shadcnComponent/ui/button";
import { useCreatePost } from "@/features/api/Posts/createPost/useCreatePost";
import { Input } from "@/shadcnComponent/ui/input";

const CreatePostInput = () => {
  const { loadingPost, createPost } = useCreatePost();

  const FormSchema = z.object({
    title: z.string().min(1, { message: "Please enter a title" }),
    detail: z.string().min(5, { message: "Must have 10 characters" }),
    image: z
      .any()
      .refine(
        (files) =>
          files instanceof FileList &&
          Array.from(files).every((file) => file instanceof File) &&
          files.length <= 4,
        {
          message: `Invalid file(s) or file limit exceeded (maximum 4 files allowed)`,
        },
      )

      .refine(
        (files) =>
          files instanceof FileList &&
          Array.from(files).every((file) => file.size <= 12828100),
        {
          message: `File size to big`,
        },
      )

      .optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      detail: "",
      image: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const { title, detail, image } = values;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("detail", detail);

    if (image && image.length > 0) {
      Array.from(image).forEach((file) => {
        formData.append(`image`, file as Blob);
      });
    }
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);
    createPost(formData);
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
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black capitalize text-lg">
                Image input
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage className="absolute " />
            </FormItem>
          )}
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
