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
      currentPassword: string;
      newPassword: string;
      passwordConfirm: string;
    },
    undefined
  >;
  label: string;
  placeholder: string;
  name: "newPassword" | "passwordConfirm" | "currentPassword";
  type: string;
}

function FormInputUpdatePassword({
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
        <FormItem className="relative w-full transition-all duration-150 flex flex-col justify-start items-start">
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
          <FormMessage className="absolute -bottom-5" />
        </FormItem>
      )}
    />
  );
}

export default FormInputUpdatePassword;
