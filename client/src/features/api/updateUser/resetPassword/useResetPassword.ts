import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "./resetPassword";
import { toast } from "@/shadcnComponent/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const { mutate: resetPasswordFN, isPending: isResetingPassword } =
    useMutation({
      mutationFn: resetPassword,
      onSuccess: () => {
        toast({ variant: "success", description: "Success reseting password" });
        navigate("/login");
      },
      onError: () => {
        toast({ variant: "error", description: "Reseting password Failed" });
      },
    });
  return { resetPasswordFN, isResetingPassword };
};
