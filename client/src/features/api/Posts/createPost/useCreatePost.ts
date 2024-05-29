import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostApi } from "./createPost";
import { toast } from "@/shadcnComponent/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data: PostData,
    isPending: loadingPost,
    mutate: createPost,
    error,
  } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      console.log(data);
      toast({ title: "Post successfully created" });
      queryClient.setQueryData(["post"], data);
      navigate("/");
    },
    onError: (data) => {
      console.log(data);
      toast({ title: "Post creating fail", variant: "error" });
    },
  });

  return { PostData, loadingPost, createPost, error };
}
