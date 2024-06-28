import { useRefreshLogin } from "@/features/api/Auth/login/useRefreshLogin";
import { Icomment } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import { UserType } from "@/utils/type";

import React, { ReactNode, useEffect, useState } from "react";

import { createContext } from "react";

export const UserContext = createContext<{
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  comment: Icomment | null;
  setComment: React.Dispatch<React.SetStateAction<Icomment | null>>;
}>({
  user: null,
  comment: null,
  setComment: () => {},
  setUser: () => {},
});
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [comment, setComment] = useState<Icomment | null>(null);
  const accesstoken = user?.accessToken || "";
  const { refreshLoginData } = useRefreshLogin(accesstoken);
  useEffect(() => {
    if (refreshLoginData) {
      setUser(refreshLoginData);
    }
  }, [refreshLoginData]);
  // useEffect(() => {
  //   const accesstoken = user?.accessToken;

  //   if (!user) {
  //     axios
  //       .get("auth/isLogin", {
  //         headers: { Authorization: `Bearer ${accesstoken}` },
  //       })
  //       .then(({ data }) => {
  //         setUser(data);
  //       })
  //       .catch((err) => {
  //         toast({ variant: "error", description: err.data.message });
  //       });
  //   }
  // });

  return (
    <UserContext.Provider value={{ user, setUser, setComment, comment }}>
      {children}
    </UserContext.Provider>
  );
};
