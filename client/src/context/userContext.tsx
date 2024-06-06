import { toast } from "@/shadcnComponent/ui/use-toast";
import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";

import { createContext } from "react";

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
    id: string;
  };
}
export const UserContext = createContext<{
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  fetchType: string;
  setFetchType: React.Dispatch<React.SetStateAction<string>>;
}>({
  user: null,
  fetchType: "popular",
  setUser: () => {},
  setFetchType: () => "",
});
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [fetchType, setFetchType] = useState("popular");

  useEffect(() => {
    const accesstoken = user?.accessToken;

    if (!user) {
      axios
        .get("auth/isLogin", {
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
    <UserContext.Provider value={{ user, setUser, fetchType, setFetchType }}>
      {children}
    </UserContext.Provider>
  );
};
