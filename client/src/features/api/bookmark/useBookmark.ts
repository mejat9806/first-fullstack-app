import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookmarkApi from "./bookmarkApi";
import { toast } from "@/shadcnComponent/ui/use-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const useBookmark = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate: mutateBookmark, isPending: isToogleBookmark } = useMutation({
    mutationFn: bookmarkApi,
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        toast({ variant: "error", description: err.message });
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["bookmark"], data);
      queryClient.invalidateQueries({ queryKey: ["userProfile", id] });
      queryClient.invalidateQueries({ queryKey: ["bookmark", data] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
  return { mutateBookmark, isToogleBookmark };
};

export default useBookmark;
