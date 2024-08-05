import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "./deleteUserApi";
import { toast } from "@/shadcnComponent/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const useDeleteApi = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteAcc, isPending: isDeleteAcc } = useMutation({
    mutationFn: (userId: string) => deleteUserApi(userId),
    onSuccess: () => {
      toast({ title: "Delete Post Successfully" });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login");
    },
  });
  return { deleteAcc, isDeleteAcc };
};
