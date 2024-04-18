import { createContext, useContext } from "react";
import useSessionStorage from "@app_hooks/useSessionStorage";
import IUser from "@app_interfaces/IUser";
interface AuthContextType {
  employee: IUser | null;
  token: string | null;
  refreshToken: string | null;
  setEmployee: (employee: IUser | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  employee: null,
  token: null,
  refreshToken: null,
  setEmployee: () => {},
  setToken: () => {},
  setRefreshToken: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employee, setEmployee] = useSessionStorage("app-employee");
  const [token, setToken] = useSessionStorage("app-emp-token");
  const [refreshToken, setRefreshToken] = useSessionStorage(
    "app-emp-refresh-token"
  );

  const logout = () => {
    sessionStorage.removeItem("app-employee");
    sessionStorage.removeItem("app-emp-token");
    sessionStorage.removeItem("app-emp-refresh-token");

    setEmployee(null);
    setToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        employee,
        setEmployee,
        token,
        setToken,
        refreshToken,
        setRefreshToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
