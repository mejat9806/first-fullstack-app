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

interface FormInputCreatePostProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  label: string;
  name: string;
  placeholder?: string;
  type: string;
}

const FormInputCreatePost = ({
  form,
  label,
  placeholder,
  name,
  type,
}: FormInputCreatePostProps) => {
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
            <>
              {type === "text" && (
                <Input
                  placeholder={placeholder}
                  {...field}
                  className=""
                  type={type}
                  autoComplete="on"
                />
              )}
              {type === "textArea" && (
                <Textarea {...field} placeholder={placeholder} />
              )}
            </>
          </FormControl>
          <FormMessage className="absolute " />
        </FormItem>
      )}
    />
  );
};

export default FormInputCreatePost;
