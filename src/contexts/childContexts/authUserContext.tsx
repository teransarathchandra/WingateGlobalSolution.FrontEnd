import { createContext, useContext } from "react";
import useSessionStorage from "@app_hooks/useSessionStorage";
import IUser from "@app_interfaces/IUser";
interface AuthContextType {
  user: IUser | null;
  userToken: string | null;
  userRefreshToken: string | null;
  setUser: (user: IUser | null) => void;
  setUserToken: (userToken: string | null) => void;
  setUserRefreshToken: (userToken: string | null) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userToken: null,
  userRefreshToken: null,
  setUser: () => {},
  setUserToken: () => {},
  setUserRefreshToken: () => {},
  logoutUser: () => {},
});

export const AuthUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useSessionStorage("app-usr");
  const [userToken, setUserToken] = useSessionStorage("app-usr-token");
  const [userRefreshToken, setUserRefreshToken] = useSessionStorage(
    "app-usr-refresh-token"
  );

  const logoutUser = () => {
    sessionStorage.removeItem("app-usr");
    sessionStorage.removeItem("app-usr-token");
    sessionStorage.removeItem("app-usr-refresh-token");

    setUser(null);
    setUserToken(null);
    setUserRefreshToken(null);

    
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userToken,
        setUserToken,
        userRefreshToken,
        setUserRefreshToken,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuthContext = () => useContext(AuthContext);
