import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/shadcnComponent/ui/use-toast";
import { logoutApi } from "./logoutApi";

export function useLogout() {
  const navigate = useNavigate();

  const { isPending: isLogout, mutate: logout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      toast({
        title: "Logout successfully",
        variant: "success",
      });
      navigate("/login");
    },
    onError: (err) => {
      toast({
        title: "Logout failed",
        description: err.message,
        variant: "error",
      });
    },
  });
  return { isLogout, logout };
}
