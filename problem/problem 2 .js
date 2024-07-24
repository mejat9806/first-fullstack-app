import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
    image: z.instanceof(File).optional(),
  });
  const form =
    useForm <
    z.infer <
    typeof FormSchema >>
      {
        resolver: zodResolver(FormSchema),
        defaultValues: {
          title: "",
          detail: "",
          image: undefined,
        },
      };
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const { detail, title, image } = values;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("detail", detail);

    // Ensure 'image' is not null or undefined
    if (image) {
      // Append each file from the 'image' FileList
      Array.from(image).forEach((file: File) => {
        formData.append("image", file);
      });
    }

    // createPost(formData);
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
                  onChange={(e) => field.onChange(e.target.files)} // Handle file input correctly
                />
              </FormControl>
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
