import { useMutation } from "@tanstack/react-query";
import { updatePasswordApi } from "./updatePasswordApi";
import { toast } from "@/shadcnComponent/ui/use-toast";
import axios from "axios";
import { useLogout } from "../../Auth/logout/useLogout";

export const useUpdatePassword = () => {
  const { logout } = useLogout();
  const { mutate: updatePassword, isPending: isUpdatePassword } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Update password successfully",
      });
      logout();
    },
    onError: (err) => {
      console.log("ERROR", err);
      if (axios.isAxiosError(err) && err.response)
        //this how to read error from axios
        toast({
          title: "Login Error",
          description: err.response.data.message,
          variant: "error",
        });
    },
  });
  return { updatePassword, isUpdatePassword };
};
