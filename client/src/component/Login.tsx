import { useLogin } from "@/features/api/Auth/login/useLogin";
import { Form } from "@/shadcnComponent/ui/form";
import { Button } from "@/shadcnComponent/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputLogin from "@/component/ui_components/FormInput";

function Login() {
  const { login, isLoading } = useLogin();
  const FormSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Please enter a valid email address" })
      .email(),
    password: z.string().min(4),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "mejathussin@gmail.com",
      password: "12345678",
    },
  });

  // const loginUser = async (e) => {
  //   e.preventDefault();

  //   const { email, password } = data; // Destructure email and password from data

  //   // Call the login function returned by the useLogin hook
  //   login({ email, password });

  //   // navigate("/dashboard");
  // };
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    login({ email: values.email, password: values.password });
    // await login(values.email, values.password);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-16 capitalize w-full "
      >
        <FormInputLogin
          form={form}
          label={"email"}
          placeholder={"email"}
          name="email"
          type="email"
        />
        <FormInputLogin
          form={form}
          label={"password"}
          placeholder={"password"}
          name="password"
          type="password"
        />

        <Button type="submit" className="hover:bg-slate-600 ">
          {!isLoading ? "  Submit" : "Loading..."}
        </Button>
      </form>
    </Form>
  );
}

export default Login;
