import React, { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcnComponent/ui/dropdown-menu";

import { ThreeDot } from "./3Dot";
import { UserContext } from "@/context/userContext";

interface IDropdownMenu {
  type: "threeDot" | "profile";
  label?: string;
  dropDownStuff: { name: string; function?: () => void; linkTo?: string }[];
}
const ThreeDotDropDown = ({ label, dropDownStuff, type }: IDropdownMenu) => {
  const { user } = useContext(UserContext);
  console.log(user.profileImage);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {type === "threeDot" && <ThreeDot style="h-5 w-10 8 rotate-90 " />}
        {/* {type === "profile" && user?.profileImage && (
          <img
            src={`${user?.profileImage}`}
            alt="Profile"
            className="w-10 h-10 "
          />
        )} */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {label && <DropdownMenuLabel>My Account</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        {dropDownStuff.map((stuff) => (
          <DropdownMenuItem key={stuff.name} onClick={stuff.function}>
            {stuff.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThreeDotDropDown;
