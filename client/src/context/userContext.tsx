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
  useEffect(() => {
    const accesstoken = user?.accessToken;

    if (!user) {
      axios
        .get("auth/profile", {
          headers: { Authorization: `Bearer ${accesstoken}` },
        })
        .then(({ data }) => {
          setUser(data);
        });
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
