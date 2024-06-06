import { Form } from "@/shadcnComponent/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../ui_components/FormInput";

const AddBannerImage = ({ setIsOpen }: { setIsOpen: () => void }) => {
  const FormSchema = z.object({
    bannerImage: z.any(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({});
  function submit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormInput
          form={form}
          label="bannerImage"
          placeholder="bannerImage"
          type="file"
          name="bannerImage"
        />
      </form>
    </Form>
  );
};

export default AddBannerImage;
