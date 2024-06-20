import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookmarkApi from "./bookmarkApi";
import { toast } from "@/shadcnComponent/ui/use-toast";
import axios from "axios";

const useBookmark = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateBookmark, isPending: isToogleBookmark } = useMutation({
    mutationFn: bookmarkApi,
    mutationKey: ["bookmark"],
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err);
        toast({ variant: "error", description: err.message });
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["bookmark"], data);

      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
  return { mutateBookmark, isToogleBookmark };
};

export default useBookmark;
