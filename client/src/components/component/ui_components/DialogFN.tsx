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
import CarouselComp from "./CarouselComp";
import { useTheme } from "@/components/darkMode/theme-provider";

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
  type: "confirm" | "image" | "component";
  image?: [string];
  component?: React.ReactNode;
  currentPage?: string;
}

const DialogFN = ({
  open,
  setIsOpen,
  func,
  type,
  currentPage,
  image,
  component,
}: DialogProps) => {
  const { theme } = useTheme();
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent
        type="image"
        className={`${
          type === "image"
            ? "bg-transparent px-10 border-none shadow-none max-w-4xl"
            : " py-10"
        }  ${currentPage === "crop-img" ? "h-1/2" : "h-fit"}`}
      >
        <DialogHeader>
          {type === "image" && image && (
            <DialogDescription className="w-[100%]  h-full ">
              <CarouselComp
                imageProp={image}
                setOpenImage={setIsOpen}
                open={open}
              />
            </DialogDescription>
          )}
          {type === "confirm" && (
            <>
              <DialogTitle
                className={`${theme === "dark" ? "text-white" : ""}`}
              >
                Are you absolutely sure?
              </DialogTitle>{" "}
              <DialogDescription className="flex flex-col gap-4">
                This action cannot be undone. This will permanently delete your
                Post
              </DialogDescription>
              <div className="flex gap-4">
                <Button variant={"destructive"} onClick={func}>
                  Confirm
                </Button>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              </div>
            </>
          )}
          {type === "component" && (
            <div className="w-full h-full">{component}</div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFN;
