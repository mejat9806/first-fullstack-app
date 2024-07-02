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
import DefaultProfile from "../DefaultProfile";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { baseUrl } from "@/lib/basedURL";
import { useLogin } from "@/features/api/Auth/login/useLogin";
import LoadingPage from "../LoadingPage";
import { useTheme } from "@/components/darkMode/theme-provider";

const ProfileIcon = () => {
  const { logout } = useLogout();
  const { isLoading } = useLogin();
  const { setTheme, theme } = useTheme();
  const { user } = useContext(UserContext);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else setTheme("dark");
  };

  if (isLoading || !user) {
    return <LoadingPage />;
  }

  const profileImage = `${
    user.profileImage ?? "./../../../../../public/img/userImage/defaultUser.svg" //return leftside if it not null/undefiend .if null/undifined it will return the right
  }`;

  return (
    <div className={`${theme === "dark" ? "text-white" : "text-black"}`}>
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
        <DropdownMenuContent
          className={`${
            theme === "dark" ? "bg-black/20" : "bg-white/20"
          } backdrop-blur-2xl drop-shadow-2xl p-2`}
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={`/profile/${user.id}`} className="w-full">
              View profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/setting" className="w-full">
              Setting
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-transparent" onClick={toggleTheme}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </DropdownMenuItem>
          <DropdownMenuItem>Contact the Dev</DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => {
                console.log("click"), logout();
              }}
            >
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileIcon;
