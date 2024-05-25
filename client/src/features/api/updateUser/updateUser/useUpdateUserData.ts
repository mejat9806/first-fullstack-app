import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateUserApi from "./updateUserApi";
import { toast } from "@/shadcnComponent/ui/use-toast";
import { useLogout } from "../../Auth/logout/useLogout";

const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  const { logout } = useLogout();
  const {
    data: updateData,
    error: updateDataError,
    isPending: isPending,
    mutate: updateUserFn,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Update successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["user"] });
      logout();
    },
    onError: (err) => {
      toast({ title: err.message });
      console.log(err);
    },
  });
  return { updateData, updateDataError, isPending, updateUserFn };
};

export default useUpdateUserData;
