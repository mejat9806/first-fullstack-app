import { checkEmail } from "@/features/api/validation/Email/checkEmail";
import { Button } from "@/shadcnComponent/ui/button";
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
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { debounce, DebouncedFunc } from "lodash";
import { useForgotPassword } from "@/features/api/updateUser/forgotPassword/useForgotPassword";

const ForgotPassForm = () => {
  const { forgotPass, forgotPassLoading } = useForgotPassword();
  //this is debounce
  // const emailDebounce: DebouncedFunc<(email: string) => Promise<boolean>> = //debounce will take a email and return a promise
  //   useRef(
  //     //useRef here will keep the mutable state across multiple render when we input the email
  //     //
  //     debounce(async (email: string): Promise<boolean> => {
  //       //this is the main debounce from loadash
  //       const result = await checkEmail(email); //this will run the checkEmail from the api
  //       console.log(result);
  //       return result; //return true or false
  //     }, 1), //run it every 300ms
  //   ).current; //this is to access the current input

  const FormSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled" })
      .email("This is not a valid email"),
    // .refine(
    //   //this requires promise if need api if normal like check length or something it is ok without promise
    //   async (email) => {
    //     return new Promise<boolean>((resolve) => {
    //       //create a new promise
    //       // Ensure the promise always resolves correctly
    //       const result = emailDebounce(email); //this will run the emailDebounce above need promise because it is async
    //       if (result === undefined) {
    //         resolve(false); //if it undefined return false to ensure the promise allways resolves even if the debounced is not complete yet
    //       } else {
    //         result
    //           .then((isValid) => {
    //             //this part of the Api response
    //             resolve(isValid); // Resolve with true if email is not valid, false otherwise
    //           })
    //           .catch(() => resolve(false));
    //       }
    //     });
    //   },
    //   { message: "This email does not exist in our database" },
    // ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    forgotPass(values.email);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={forgotPassLoading}
                  placeholder="Email"
                  {...field}
                  type="email"
                  autoComplete="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={forgotPassLoading}>Submit</Button>
      </form>
    </Form>
  );
};

export default ForgotPassForm;
