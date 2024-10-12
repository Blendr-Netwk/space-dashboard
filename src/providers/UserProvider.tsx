"use client";
import { getAuthenticatedUser } from "@/clientApi/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setAxiosJwtToken } from "@/service/axios";
import { LOCAL_STORAGE_AUTH_KEY } from "@/constants/app";
import { IUser } from "@/types/user";
import { connectWallet } from "@/service/ether";

interface UserContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  handleAuthentication: any;
  status: string; // "idle"| "loading" | "authenticated" | "failed";
}
// interface UserProviderProps {
//   children: React.ReactNode;
// }

const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  handleAuthentication: null,
  status: "idle",
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const router = useRouter();
  const [user, setUser] = useState(null);
  // const [authenticate, { data, error }] = useAuthenticateUserMutation();
  const [status, setStatus] = useState("idle");

  const handleAuthentication = async () => {
    const user = await getAuthenticatedUser();
    if (user) {
      setUser(user);
      setStatus("authenticated");
    }

    return user;
  };

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
        //TODO: get what type from here.
        if (!token) throw new Error("No Token");
        ///api/authenticate if user
        // console.log("token", token);
        setAxiosJwtToken(token);
        await connectWallet("metamask");
        await handleAuthentication();
      } catch (err) {
        setStatus("failed");
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
        console.log(err);
      }
    })();
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     setUser(data.user);
  //     setStatus("authenticated");
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (error) {
  //     localStorage.removeItem(AUTH_TOKEN);
  //     setStatus("failed");
  //   }
  // }, [error]);

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated: !!user, handleAuthentication, status }}
    >
      {children}
    </UserContext.Provider>
  );
};
