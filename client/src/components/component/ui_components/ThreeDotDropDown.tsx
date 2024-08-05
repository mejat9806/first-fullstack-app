import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcnComponent/ui/dropdown-menu";

import { ThreeDot } from "./3Dot";
import { useState } from "react";
import DialogFN from "./DialogFN";

import { useParams } from "react-router-dom";
import { useDeletePost } from "@/features/api/Posts/deletePost/useDeletePost";
import UpdatePost from "./PostComponent/UpdatePost";

export interface dropDownStuff {
  dropDownStuff: { name: string; linkTo?: string }[];
}

const ThreeDotDropDown = ({ dropDownStuff }: dropDownStuff) => {
  // const [open, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const { DeletePost } = useDeletePost();

  const { postId } = useParams();

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
                  onSelect={() => setShowUpdateDialog(true)}
                  className="capitalize"
                >
                  Update
                </DropdownMenuItem>
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogFN
        open={showDeleteDialog}
        type="confirm"
        setIsOpen={setShowDeleteDialog}
        func={() => DeletePost(postId as string)}
      />
      <DialogFN
        open={showUpdateDialog}
        type="component"
        setIsOpen={setShowUpdateDialog}
        component={<UpdatePost setShowUpdateDialog={setShowUpdateDialog} />}
      />
    </>
  );
};

export default ThreeDotDropDown;
