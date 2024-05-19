import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcnComponent/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/shadcnComponent/ui/dialog";
import { ThreeDot } from "./3Dot";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

import { useParams } from "react-router-dom";
import { useDeletePost } from "@/features/api/Posts/deletePost/useDeletePost";

export interface dropDownStuff {
  dropDownStuff: { name: string; linkTo?: string }[];
}

const ThreeDotDropDown = ({ dropDownStuff }: dropDownStuff) => {
  const [open, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { DeletePost, isDeletePostLoading } = useDeletePost();

  const { postId } = useParams();
  console.log(postId);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ThreeDot style="h-5 w-10 8 rotate-90 " />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="drop-shadow-2xl">
          {dropDownStuff.map((stuff) => (
            <div key={stuff.name}>
              {/* <DropdownMenuItem onClick={stuff.function} className="capitalize">
              {stuff.name}
            </DropdownMenuItem> */}
              {stuff.name === "delete" ? (
                <DropdownMenuItem
                  onSelect={() => setShowDeleteDialog(true)}
                  className="capitalize"
                >
                  Delete
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onSelect={() => setShowDeleteDialog(true)}
                  className="capitalize"
                >
                  Update
                </DropdownMenuItem>
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        open={showDeleteDialog}
        setIsOpen={setShowDeleteDialog}
        func={() => DeletePost(postId as string)}
      />
    </>
  );
};

export default ThreeDotDropDown;
