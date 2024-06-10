import { useTheme } from "@/components/darkMode/theme-provider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnComponent/ui/form";
import { Input } from "@/shadcnComponent/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import Tiptap from "./Tiptap";

interface FormInput<T extends FieldValues> {
  form: UseFormReturn<T, undefined>;
  label: string;
  placeholder: string;
  name: Path<T>;
  type: string;
  disabled: boolean;
}

function FormInput<T extends FieldValues>({ form, label, name }: FormInput<T>) {
  const { theme } = useTheme();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`relative w-full transition-all duration-150 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <FormLabel className=" capitalize">{label}</FormLabel>
          <FormControl>
            {/* <Input
              placeholder={placeholder}
              {...field}
              className=""
              type={type}
              autoComplete="on"
              disabled={disabled}
            /> */}
            <Tiptap description={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage className="absolute " />
        </FormItem>
      )}
    />
  );
}

export default FormInput;
