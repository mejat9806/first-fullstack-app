import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnComponent/ui/form";
import { Input } from "@/shadcnComponent/ui/input";
import { UseFormReturn } from "react-hook-form";

interface FormInput {
  form: UseFormReturn<
    {
      email?: string;
      name?: string;
      password?: string;
      passwordConfirm?: string;
    },
    undefined
  >;
  label: string;
  placeholder: string;
  name: "email" | "name" | "password" | "passwordConfirm";
  type: string;
}

function FormInputUpdateUser({
  form,
  label,
  placeholder,
  name,
  type,
}: FormInput) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative w-full transition-all duration-150">
          <FormLabel className="text-black capitalize">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className=""
              type={type}
              autoComplete="on"
            />
          </FormControl>
          <FormMessage className="absolute " />
        </FormItem>
      )}
    />
  );
}

export default FormInputUpdateUser;
