import { useLogout } from "@/features/api/Auth/logout/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcnComponent/ui/dropdown-menu";
import { Link } from "react-router-dom";
import DefaultProfile from "./DefaultProfile";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { baseUrl } from "./PostComponent/PostItem";
const ProfileIcon = () => {
  const { user } = useContext(UserContext);
  const { logout } = useLogout();

  const logoutFn = async () => {
    logout();
  };
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:drop-shadow-2xl">
          {user?.profileImage ? (
            <img
              src={`${baseUrl}img/posts/${user?.profileImage}`}
              alt="Profile"
              className="w-10 h-10 "
            />
          ) : (
            <DefaultProfile />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white/20 backdrop-blur-2xl drop-shadow-2xl p-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/dashboard" className="p-0">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/setting" className="p-0">
              Setting
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Contact the Dev</DropdownMenuItem>
          <DropdownMenuItem onClick={logoutFn}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileIcon;
