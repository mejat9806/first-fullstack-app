import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi } from "./loginApi";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { toast } from "@/shadcnComponent/ui/use-toast";
import axios from "axios";

export function useLogin() {
  const queryClient = useQueryClient();
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const {
    mutate: login,
    isPending: isLoading,
    data: loginData,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email: email, password: password }),
    onSuccess: (data) => {
      toast({
        title: "Login Success",
        variant: "success",
      });

      queryClient.setQueryData(["user"], data);
      setUser(data.data);
      // setAuth(data);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response)
        //this how to read error from axios
        toast({
          title: "Login Error",
          description: err.response.data.message,
          variant: "error",
        });
    },
  });
  return { login, isLoading, loginData };
}
