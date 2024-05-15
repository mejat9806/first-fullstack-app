import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnComponent/ui/form";
import { Input } from "@/shadcnComponent/ui/input";
import { Textarea } from "@/shadcnComponent/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface FormInput {
  form: UseFormReturn<
    {
      title: string;
      detail: string;
    },
    undefined
  >;
  label: string;
  placeholder: string;
  name: "title" | "detail";
  type: string;
}

const FormInputCreatePost = ({
  form,
  label,
  placeholder,
  name,
  type,
}: FormInput) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative w-full transition-all duration-150">
          <FormLabel className="text-black capitalize text-lg">
            {label}
          </FormLabel>
          <FormControl>
            {type !== "textArea" ? (
              <Input
                placeholder={placeholder}
                {...field}
                className=""
                type={type}
                autoComplete="on"
              />
            ) : (
              <Textarea {...field} placeholder={placeholder} />
            )}
          </FormControl>
          <FormMessage className="absolute " />
        </FormItem>
      )}
    />
  );
};

export default FormInputCreatePost;
