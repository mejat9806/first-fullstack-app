import { toast } from "@/shadcnComponent/ui/use-toast";
import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";

import { createContext } from "react";
import { useLocation } from "react-router-dom";

export interface AuthType {
  email: string;
  id: string;
  name: string;
  iat: string;
  profileImage: string;
}

export interface UserType extends AuthType {
  accessToken: string;
  user: {
    password: string;
    profileImage: string;
    email: string;
    name: string;
  };
}
export const UserContext = createContext<{
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}>({
  user: null,
  setUser: () => {},
});
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    const accesstoken = user?.accessToken;

    if (!user && pathname === "/") {
      axios
        .get("auth/profile", {
          headers: { Authorization: `Bearer ${accesstoken}` },
        })
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          toast({ variant: "error", description: err.data.message });
        });
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
