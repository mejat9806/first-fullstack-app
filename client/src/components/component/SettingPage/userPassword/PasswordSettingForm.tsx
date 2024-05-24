import { Form } from "@/shadcnComponent/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInputUpdatePassword from "./FormInputUpdatePassword";
import { Button } from "@/shadcnComponent/ui/button";
const PasswordSettingForm = () => {
  const FormSchema = z
    .object({
      currentPassword: z
        .string()
        .min(8, { message: "Password need to be 8 character" }),
      newPassword: z
        .string()
        .min(8, { message: "Password need to be 8 character" }),
      passwordConfirm: z.string(),
    })
    .refine((data) => data.newPassword === data.passwordConfirm, {
      message: "passwords do not match",
      path: ["passwordConfirmed"],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormInputUpdatePassword
          form={form}
          label={"current Password"}
          placeholder={"Password"}
          type="password"
          name={"currentPassword"}
        />
        <FormInputUpdatePassword
          form={form}
          label={"New Password"}
          placeholder={"New Password"}
          type="password"
          name={"newPassword"}
        />
        <FormInputUpdatePassword
          form={form}
          label={"Confirm Password"}
          placeholder={"Confirm Password"}
          type="password"
          name={"passwordConfirm"}
        />
        <div className="w-full flex items-center justify-end">
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordSettingForm;
