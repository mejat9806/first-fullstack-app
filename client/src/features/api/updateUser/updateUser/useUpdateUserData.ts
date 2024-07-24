import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateUserApi from "./updateUserApi";
import { toast } from "@/shadcnComponent/ui/use-toast";

const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  const {
    data: updateData,
    error: updateDataError,
    isPending: isPending,
    mutate: updateUserFn,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast({
        title: "Update successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (err) => {
      toast({ title: err.message });
    },
  });
  return { updateData, updateDataError, isPending, updateUserFn };
};

export default useUpdateUserData;
