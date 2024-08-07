import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleFollowApi } from "./ToggleFollowApi";
import axios from "axios";
import { toast } from "@/shadcnComponent/ui/use-toast";

export const useToggleFollow = () => {
  // const { userId } = useParams();
  const query = useQueryClient();
  const { mutate: ToggleFollow, isPending: isToggleFollow } = useMutation({
    mutationKey: ["follow"],
    mutationFn: ToggleFollowApi,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["follow"] });
      query.invalidateQueries({ queryKey: ["userProfile"] });
      query.invalidateQueries({ queryKey: ["profile"] });
      query.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        toast({
          title: "Login Error",
          description: err.response.data.message,
          variant: "error",
        });
      }
    },
  });
  return { ToggleFollow, isToggleFollow };
};
