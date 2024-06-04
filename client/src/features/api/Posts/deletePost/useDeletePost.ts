import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deletePostApi } from "./deletePost";
import { toast } from "@/shadcnComponent/ui/use-toast";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { postId } = useParams();

  const {
    mutate: DeletePost,
    isPending: isDeletePostLoading,
    status,
  } = useMutation({
    mutationFn: (postId: string) => deletePostApi(postId),
    onSuccess: () => {
      toast({ title: "Delete Post Successfully" });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      navigate("/");
    },
    onError: (err) => {
      toast({ title: err.message });
      console.log(err);
    },
  });
  return { DeletePost, isDeletePostLoading, status };
};
