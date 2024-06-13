import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentApi } from "./createCommentApi";
import { toast } from "@/shadcnComponent/ui/use-toast";
import axios from "axios";

export interface IcreateComment {
  commentText: string;
  postId: string;
}
const useCreateComment = () => {
  const queryClient = useQueryClient();
  const {
    mutate: AddComment,
    isPending: isAddComment,
    isSuccess: isSuccessAddComment,
  } = useMutation({
    mutationFn: ({ commentText, postId }: IcreateComment) =>
      createCommentApi({ commentText, postId }),
    mutationKey: ["comment"],
    onSuccess: () => {
      toast({ variant: "success", description: "Comment added" });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err);
        toast({ variant: "error", description: err.message });
      }
    },
  });

  return { AddComment, isAddComment, isSuccessAddComment };
};

export default useCreateComment;
