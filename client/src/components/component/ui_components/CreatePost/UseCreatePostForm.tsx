import { useCreatePost } from "@/features/api/Posts/createPost/useCreatePost";
import { Button } from "@/shadcnComponent/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Please enter a title" }),
  detail: z.string().min(5, { message: "Must have 10 characters" }),
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) =>
        !files || Array.from(files).every((file) => file instanceof File),
      {
        message: "Invalid file",
      },
    )
    .optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const UseCreatePostForm = () => {
  const { loadingPost, createPost } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  function submit(formData: FormSchemaType) {
    const { title, detail, image } = formData;

    const data = new FormData();
    data.append("title", title);
    data.append("detail", detail);

    if (image && image.length > 0) {
      Array.from(image).forEach((file, index) => {
        data.append(`image_${index}`, file); // Append each file with a unique key
      });
    }

    createPost(data);
  }

  return (
    <div>
      <h1>Create new Post</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="title">Post Title</label>
          <input type="text" id="title" {...register("title")} />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor="detail">Post Detail</label>
          <textarea id="detail" {...register("detail")}></textarea>
          {errors.detail && <span>{errors.detail.message}</span>}
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" multiple {...register("image")} />
          {errors.image && <span>{errors.image.message}</span>}
        </div>

        <Button type="submit" disabled={loadingPost}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UseCreatePostForm;
