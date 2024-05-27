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
      email: string;
      password: string;
      passwordConfirm: string;
      name: string;
    },
    undefined
  >;
  label: string;
  placeholder: string;
  name: "email" | "password" | "passwordConfirm" | "name";
  type: string;
  disabled: boolean;
}

function FormInputRegister({
  form,
  label,
  placeholder,
  name,
  type,
  disabled,
}: FormInput) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="text-black capitalize">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className=""
              type={type}
              autoComplete="on"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="absolute " />
        </FormItem>
      )}
    />
  );
}

export default FormInputRegister;
