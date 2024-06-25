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
  label?: string;
  placeholder: string;
  name: Path<T>;
  type: string;
  disabled: boolean;
  textInput?: "normal" | "rich";
  className?: string;
  withCancel?: boolean;
  onCancel?: () => void;
}

function FormInput<T extends FieldValues>({
  form,
  label,
  name,
  textInput = "normal",
  placeholder,
  onCancel,
  type,
  withCancel = false,
  disabled,
}: FormInput<T>) {
  const { theme } = useTheme();
  const isFieldInvalid = !!form.formState.errors[name];
  console.log(isFieldInvalid);
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
          {label && <FormLabel className=" capitalize">{label}</FormLabel>}
          <FormControl>
            {textInput === "normal" ? (
              <div>
                <Input
                  {...field}
                  placeholder={placeholder}
                  id="commentInput"
                  className={` ${
                    isFieldInvalid
                      ? "placeholder-red-600 focus:ring-2 focus:ring-red-500"
                      : ""
                  }`}
                  type={type}
                  autoComplete="on"
                  disabled={disabled}
                />
                <FormMessage className="absolute font-black text-red-600 capitalize " />
              </div>
            ) : (
              <Tiptap
                isFieldInvalid={isFieldInvalid}
                onCancel={onCancel}
                disabled={disabled}
                description={field.value}
                onChange={field.onChange}
                withCancel={withCancel}
              />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default FormInput;
