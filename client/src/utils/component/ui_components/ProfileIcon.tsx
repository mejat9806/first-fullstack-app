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
import { useLogin } from "@/features/api/Auth/login/useLogin";
import LoadingPage from "./LoadingPage";

const ProfileIcon = () => {
  const { logout } = useLogout();
  const { isLoading } = useLogin();
  const { user } = useContext(UserContext);
  const logoutFn = async () => {
    logout();
  };
  if (isLoading || !user) {
    return <LoadingPage />;
  }

  const profileImage = `${baseUrl}img/posts/${
    user?.profileImage ?? user?.user?.profileImage //return leftside if it not null/undefiend .if null/undifined it will return the right
  }`;
  console.log(user);
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:drop-shadow-2xl">
          {user ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-fill"
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
