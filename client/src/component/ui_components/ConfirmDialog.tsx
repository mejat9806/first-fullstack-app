import { Button } from "@/shadcnComponent/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shadcnComponent/ui/dialog";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface DialogProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  func?: UseMutateFunction<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosResponse<any, any>,
    Error,
    unknown,
    string
  >;
}

const ConfirmDialog = ({ open, setIsOpen, func }: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            <div>
              This action cannot be undone. This will permanently delete your
              Post
            </div>
            <div className="flex gap-4">
              <Button variant={"destructive"} onClick={func}>
                Confirm
              </Button>
              <Button>Cancel</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
