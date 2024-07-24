import { useMutation } from "@tanstack/react-query";
import { checkEmail } from "./checkEmail";
import { toast } from "@/shadcnComponent/ui/use-toast";
const useCheckEmail = () => {
  const { mutate: checkingEmail, isPending: isCheckingEmail } = useMutation({
    mutationFn: checkEmail,
    onSuccess: (data) => {},
    onError(err) {
      console.error(err);
      toast({ variant: "error", description: err.message });
    },
  });
  return { checkingEmail, isCheckingEmail };
};

export default useCheckEmail;
