import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "./forgotPasswordApi";
import { toast } from "@/shadcnComponent/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const { isPending: forgotPassLoading, mutate: forgotPass } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast({
        variant: "success",
        description: "Please check your email for further instructions",
      });
      navigate("/checkEmail", { replace: true });
      return data;
    },
    onError: (err) => {
      toast({ variant: "error", description: "Please check your email again" });
    },
  });
  return { forgotPass, forgotPassLoading };
};
