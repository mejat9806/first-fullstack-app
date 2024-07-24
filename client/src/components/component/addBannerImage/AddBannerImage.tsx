import { Form } from "@/shadcnComponent/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../ui_components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shadcnComponent/ui/button";

const AddBannerImage = () => {
  const FormSchema = z.object({
    bannerImage: z.any(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bannerImage: undefined,
    },
  });
  // function submit(values: z.infer<typeof FormSchema>) {}
  const diabled = false;
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(submit)}
        className="flex justify-center items-center"
      >
        <FormInput
          form={form}
          label="Banner Image"
          placeholder="bannerImage"
          type="file"
          disabled={diabled}
          name="bannerImage"
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default AddBannerImage;
