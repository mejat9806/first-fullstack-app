import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnComponent/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/shadcnComponent/ui/button";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import LoadingPage from "../../ui_components/LoadingPage";
import { Input } from "@/shadcnComponent/ui/input";
import useUpdateUserData from "@/features/api/updateUser/updateUser/useUpdateUserData";
import FormInput from "../../ui_components/FormInput";

const SettingForm = () => {
  const { user } = useContext(UserContext);
  const { isPending, updateUserFn } = useUpdateUserData();
  if (!user) {
    return <LoadingPage />;
  }
  const FormSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Please enter a valid email address" })
      .email()
      .optional(),
    name: z
      .string()
      .min(5, { message: "Please enter atleast 5 character" })
      .optional(),
    image: z.any(),
    //   password: z
    //     .string()
    //     .min(8, { message: "Password need to be 8 character" })
    //     .optional(),
    //   passwordConfirm: z.string().optional(),
  });
  // .refine((data) => data.password === data.passwordConfirm, {
  //   message: "passwords do not match",
  //   path: ["passwordConfirmed"],
  // });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: user?.email ?? user.user.email,
      name: user?.name ?? user.user.name,
      image: undefined,
      //   password: "",
      //   passwordConfirm: "",
    },
  });
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const { email, name, image } = values;
    const formData = new FormData();

    //next it will check if any parts of the form exist
    if (email) {
      formData.append("email", email);
    }
    if (name) {
      formData.append("name", name);
    }
    if (image) {
      formData.append("profileImage", image);
    }
    formData.forEach((data, key) => {
      console.log(key, data);
    });
    updateUserFn(formData);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
        <FormInput
          form={form}
          label={"email"}
          disabled={isPending}
          placeholder={"email"}
          type="email"
          name={"email"}
        />
        <FormInput
          form={form}
          disabled={isPending}
          label={"username"}
          placeholder={"username"}
          name="name"
          type="text"
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
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage className="absolute " />
            </FormItem>
          )}
        />
        {/* <FormInputUpdateUser
          form={form}
          label={"password"}
          placeholder={"password"}
          name="password"
          type="password"
        />
        <FormInputUpdateUser
          form={form}
          label={"passwordConfirm"}
          placeholder={"passwordConfirm"}
          name="passwordConfirm"
          type="passwordConfirm"
        /> */}
        <div className="w-full ">
          <Button className="w-full" disabled={isPending}>
            {isPending ? <LoadingPage /> : "submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SettingForm;
