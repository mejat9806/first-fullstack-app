import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Iprops, updatePostApi } from "./updatePostApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/shadcnComponent/ui/use-toast";

const useUpdatePost = () => {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: updatePostMutation, isPending: isUpdatingPost } = useMutation(
    {
      mutationFn: ({ formdata, postId }: Iprops) =>
        updatePostApi({ formdata, postId }),
      onSuccess: () => {
        toast({ variant: "success", description: "update Successfully" });
        queryClient.invalidateQueries({ queryKey: ["post"] });
        navigate(`/post/${postId}`, { replace: true });
      },
      onError: (error) => {},
    },
  );
  return { isUpdatingPost, updatePostMutation };
};

export default useUpdatePost;
