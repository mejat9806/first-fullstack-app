import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi } from "./loginApi";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { toast } from "@/shadcnComponent/ui/use-toast";

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
      console.log(data, "in the quuery function");
      queryClient.setQueryData(["user"], data);
      setUser(data);
      // setAuth(data);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast({
        title: "Login Error",
        description: err.message,
        variant: "error",
      });
      console.log("ERROR", err);
    },
  });
  return { login, isLoading, loginData };
}
