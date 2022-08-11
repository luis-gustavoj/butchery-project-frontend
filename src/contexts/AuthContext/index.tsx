import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import React, { createContext, useContext, useState } from "react";
import { User } from "src/@types";
import { api, auth } from "src/services";

type Props = {
  children: React.ReactNode;
};

type Context = {
  user: User;
  token: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
};

type SignInCredentials = {
  email: string;
  password: string;
};

const AuthContext = createContext<Context | null>(null);

export function handleSignOut() {
  destroyCookie(undefined, "maq.token", {
    path: "/",
  });

  Router.push("/");
}

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(null);

  const handleSignIn = async (credentials: SignInCredentials) => {
    try {
      const { data } = await auth.login(credentials);
      const { token, user } = data;

      if (!token || !user) throw "Não foi possível realizar o login";

      setCookie(undefined, "butcher.access_token", token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser(user);
      setToken(token);

      console.log(user);

      if (user.userType === "user") Router.push("/gerenciamento");
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, signIn: handleSignIn, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(
      "AuthContext must be called from within the AuthContextProvider"
    );

  return context;
};
