import { useMutation, useQueryClient } from "@tanstack/react-query";
import { replyApi } from "./replyApi";
import { toast } from "@/shadcnComponent/ui/use-toast";
import axios from "axios";

export const useReply = () => {
  const queryClient = useQueryClient();
  const { isPending: isReply, mutate: mutateReply } = useMutation({
    mutationFn: replyApi,
    mutationKey: ["reply"],
    onSettled: () => {
      toast({ variant: "success", description: "Reply added" });
      queryClient.invalidateQueries({ queryKey: ["reply"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        toast({ variant: "error", description: err.message });
      }
    },
  });
  return { isReply, mutateReply };
};
