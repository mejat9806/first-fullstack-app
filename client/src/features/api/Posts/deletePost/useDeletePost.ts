import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deletePostApi } from "./deletePost";
import { toast } from "@/shadcnComponent/ui/use-toast";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: DeletePost, isPending: isDeletePostLoading } = useMutation({
    mutationFn: (postId: string) => deletePostApi(postId),
    onSuccess: () => {
      toast({ title: "Delete Post Successfully" });
      queryClient.invalidateQueries({ queryKey: ["posts,post"] });
      navigate("/");
    },
    onError: (err) => {
      toast({ title: err.message });
      console.log(err);
    },
  });
  return { DeletePost, isDeletePostLoading };
};
