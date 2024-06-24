import { Form } from "@/shadcnComponent/ui/form";
import { UserType } from "@/utils/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../ui_components/FormInput";
import useUpdateUserData from "@/features/api/updateUser/updateUser/useUpdateUserData";
import { Button } from "@/shadcnComponent/ui/button";

const EditProfile = ({
  userData,
  setIsOpen,
}: {
  userData: UserType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isPending, updateUserFn } = useUpdateUserData();

  const editProfileSchema = z.object({
    bio: z.string().optional(),
    name: z.string().min(3, "must have atleast 3 characters").optional(),
  });
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      bio: userData.bio,
      name: userData.name,
    },
  });
  const editProfile = (values: z.infer<typeof editProfileSchema>) => {
    const { bio, name } = values;
    const formData = new FormData();

    if (bio) {
      formData.append("bio", bio);
    }
    if (name) {
      formData.append("name", name);
    }
    updateUserFn(formData, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(editProfile)}
        className="flex flex-col gap-8"
      >
        <FormInput
          form={form}
          label={"name"}
          placeholder={"name"}
          name="name"
          type="text"
          disabled={isPending}
        />
        <FormInput
          form={form}
          label={"bio"}
          placeholder={"bio"}
          name="bio"
          type="text"
          disabled={isPending}
        />
        <div className="w-full flex items-center justify-end">
          <Button disabled={isPending}>Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfile;
