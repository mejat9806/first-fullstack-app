import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleFollowApi } from "./ToggleFollowApi";
import axios from "axios";
import { toast } from "@/shadcnComponent/ui/use-toast";
import { useParams } from "react-router-dom";

export const useToggleFollow = () => {
  const { userId } = useParams();
  const query = useQueryClient();
  const { mutate: ToggleFollow, isPending: isToggleFollow } = useMutation({
    mutationKey: ["follow"],
    mutationFn: ToggleFollowApi,
    onSuccess: () => {
      toast({
        title: "toogling work",
        description: "work",
        variant: "success",
      });
      query.invalidateQueries({ queryKey: ["follow"] });
      query.invalidateQueries({ queryKey: ["userProfile"] });
      query.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      console.log("Error", err);
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
