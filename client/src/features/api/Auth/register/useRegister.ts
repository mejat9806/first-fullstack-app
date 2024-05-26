import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { registerApi } from "./registerApi";
import { toast } from "@/shadcnComponent/ui/use-toast";
import axios from "axios";

export function useRegister() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const {
    mutate: register,
    isPending: isLoadingRegister,
    data: registerData,
  } = useMutation({
    mutationFn: ({
      email,
      password,
      passwordConfirm,
      name,
    }: {
      email: string;
      password: string;
      passwordConfirm: string;
      name: string;
    }) => registerApi({ email, password, passwordConfirm, name }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      console.log(data, "register");
      toast({
        title: "ok created",
        description: "user created successfully",
        variant: "success",
        //className: cn(),
      });
      // setAuth(data);
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response)
        toast({
          title: "Register failed",
          description: err.response.data.message,
          variant: "error",
        });
    },
  });
  return { register, isLoadingRegister, registerData };
}
