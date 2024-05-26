import { Form } from "@/shadcnComponent/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ResetFormInput from "./ResetFormInput";
import { Button } from "@/shadcnComponent/ui/button";
import { useParams } from "react-router-dom";
import { useResetPassword } from "@/features/api/updateUser/resetPassword/useResetPassword";
import { toast } from "@/shadcnComponent/ui/use-toast";

const ResetPassForm = () => {
  const { resetToken } = useParams<{ resetToken: string }>();
  const { isResetingPassword, resetPasswordFN } = useResetPassword();
  const formSchema = z
    .object({
      password: z.string().min(8, { message: "Need 8 character" }),
      passwordConfirmed: z.string().min(8, { message: "Need 8 character" }),
    })
    .refine((data) => data.password === data.passwordConfirmed, {
      //this data is from the form
      message: "Passwords do not match",
      path: ["passwordConfirmed"], //error path
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirmed: "",
    },
  });

  function onsubmit(values: z.infer<typeof formSchema>) {
    if (!resetToken) {
      toast({ variant: "error", description: "Something went wrong" });
      return;
    }
    console.log(values, resetToken);
    resetPasswordFN({
      password: values.password,
      passwordConfirmed: values.passwordConfirmed,
      resetToken: resetToken,
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex flex-col gap-4"
      >
        <ResetFormInput
          form={form}
          disabled={isResetingPassword}
          label="Password"
          name="password"
          type="password"
          placeholder="password"
        />
        <ResetFormInput
          disabled={isResetingPassword}
          form={form}
          label="Confirm Password "
          name="passwordConfirmed"
          type="password"
          placeholder="Confirming Password"
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default ResetPassForm;
