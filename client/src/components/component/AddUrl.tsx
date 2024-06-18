import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnComponent/ui/form";
import { Input } from "@/shadcnComponent/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTheme } from "../darkMode/theme-provider";
import { Button } from "@/shadcnComponent/ui/button";

const AddUrl = ({
  addLink,
  setIsOpen,
}: {
  addLink: (url: string) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { theme } = useTheme();

  const FormSchema = z.object({
    url: z.string().url(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });
  const formSubmit = (value: z.infer<typeof FormSchema>) => {
    console.log(value);
    addLink(value.url);
    setIsOpen(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem
              className={`relative w-full transition-all duration-150 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <FormLabel className=" capitalize">Url</FormLabel>
              <FormControl>
                <Input
                  placeholder="URL"
                  {...field}
                  className=""
                  type="url"
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage className="absolute " />
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default AddUrl;
