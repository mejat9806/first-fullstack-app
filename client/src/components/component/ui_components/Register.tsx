import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/shadcnComponent/ui/button";
import { useForm } from "react-hook-form";
import { useRegister } from "@/features/api/Auth/register/useRegister";
import { Form } from "@/shadcnComponent/ui/form";
import FormInputLogin from "./FormInput";

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Please enter a valid email address" })
      .email(),
    name: z.string().min(3, { message: "Please enter atleast 3 characters" }),
    password: z.string().min(8, { message: "Need 8 character" }),
    passwordConfirm: z.string().min(8, { message: "Need 8 character" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "passwords do not match",
    path: ["passwordConfirmed"], //error path
  });
function Register() {
  const { isLoadingRegister, register } = useRegister();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
  });
  async function registerUser(values: z.infer<typeof registerFormSchema>) {
    const { email, password, passwordConfirm, name } = values;
    register({ email, password, passwordConfirm, name });
    // const { data } = await axios.post("users/register", {
    //   email: values.email,
    //   username: values.username,
    //   password: values.password,
    //   passwordConfirm: values.passwordConfirm,
    // });
    // if (data.error) {
    //   console.log(data.error);
    // } else {
    //   toast({
    //     title: "ok created",
    //     description: "user created successfully",
    //     variant: "success",
    //     //className: cn(),
    //   });
    // }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(registerUser)}
        className="space-y-8 flex flex-col  "
      >
        <FormInputLogin
          form={form}
          label={"email"}
          placeholder={"email"}
          name="email"
          type="email"
          disabled={isLoadingRegister}
        />

        <FormInputLogin
          form={form}
          label={"username"}
          placeholder={"username"}
          name="name"
          type="string"
          disabled={isLoadingRegister}
        />
        <FormInputLogin
          form={form}
          label={"password"}
          placeholder={"password"}
          name="password"
          type="password"
          disabled={isLoadingRegister}
        />
        <FormInputLogin
          form={form}
          label={"password Confirmed"}
          placeholder={"passwordConfirme"}
          name="passwordConfirm"
          type="password"
          disabled={isLoadingRegister}
        />

        <Button type="submit" className="hover:bg-slate-600 ">
          {!isLoadingRegister ? "Submit" : "Please wait..."}
        </Button>
      </form>
    </Form>
  );
}

export default Register;
