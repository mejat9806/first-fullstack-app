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
  form: UseFormReturn<{
    password: string;
    passwordConfirmed: string;
  }>;
  label: string;
  placeholder: string;
  name: "password" | "passwordConfirmed";
  type: string;
  disabled: boolean;
}
const ResetFormInput = ({
  form,
  label,
  placeholder,
  name,
  type,
  disabled,
}: FormInput) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="relative mb-4">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                className="capitalize"
                type={type}
                autoComplete="true"
                disabled={disabled}
              />
            </FormControl>
            <FormMessage className="absolute" />
          </FormItem>
        );
      }}
    />
  );
};

export default ResetFormInput;
