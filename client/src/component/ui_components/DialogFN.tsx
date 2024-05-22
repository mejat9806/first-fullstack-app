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
import CarouselComp from "../CarouselComp";

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
  type: "confirm" | "image";
  image?: [string];
}

const DialogFN = ({ open, setIsOpen, func, type, image }: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent
        type="image"
        className={`${
          type === "image"
            ? "bg-transparent px-10 border-none shadow-none"
            : " py-10"
        }`}
      >
        <DialogHeader>
          {type === "image" && image && (
            <DialogDescription className="w-full  h-full">
              <CarouselComp
                imageProp={image}
                setOpenImage={setIsOpen}
                open={open}
              />
            </DialogDescription>
          )}
          {type === "confirm" && (
            <>
              <DialogTitle>Are you absolutely sure?</DialogTitle>{" "}
              <DialogDescription className="flex flex-col gap-4">
                <p>
                  This action cannot be undone. This will permanently delete
                  your Post
                </p>
              </DialogDescription>
              <div className="flex gap-4">
                <Button variant={"destructive"} onClick={func}>
                  Confirm
                </Button>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              </div>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFN;
