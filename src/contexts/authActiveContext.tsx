import { createContext, useContext } from "react";
import useSessionStorage from "@app_hooks/useSessionStorage";
import IEmployee from "@app_interfaces/IEmployee";
import IUser from "@app_interfaces/IUser";

import { authUserService } from "@app_services/authUserService";
import { authEmployeeService } from "@app_services/authEmployeeService";

import { useUserAuthContext } from "@app_contexts/childContexts/authUserContext.tsx";
import { useEmployeeAuthContext } from "@app_contexts/childContexts/authEmployeeContext.tsx";

interface AuthContextType {
  activeUser: IEmployee | IUser | null;
  activeToken: string | null;
  activeRefreshToken: string | null;
  setActiveUser: (activeUser: IEmployee | IUser | null) => void;
  setActiveToken: (activeToken: string | null) => void;
  setActiveRefreshToken: (activeToken: string | null) => void;
  isEmployee: () => boolean | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  activeUser: null,
  activeToken: null,
  activeRefreshToken: null,
  setActiveUser: () => {},
  setActiveToken: () => {},
  setActiveRefreshToken: () => {},
  isEmployee: () => null,
  logout: () => {},
});

export const AuthActiveContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeUser, setActiveUser] = useSessionStorage("app-active-user");
  const [activeToken, setActiveToken] = useSessionStorage("app-active-token");
  const [activeRefreshToken, setActiveRefreshToken] = useSessionStorage(
    "app-active-refresh-token"
  );
  const { logoutUser } = useUserAuthContext();
  const { logoutEmployee } = useEmployeeAuthContext();

  const isEmployee = () => {
    const userToken = authUserService.getUserAccessToken();
    const employeeToken = authEmployeeService.getEmployeeAccessToken();

    if (activeToken) {
      if (activeToken == userToken) {
        return false;
      }

      if (activeToken == employeeToken) {
        return true;
      }
    }
    return null;
  };

  const logout = () => {
    const userToken = authUserService.getUserAccessToken();
    const employeeToken = authEmployeeService.getEmployeeAccessToken();

    if (activeToken) {
      if (activeToken == userToken) {
        logoutUser();
      }

      if (activeToken == employeeToken) {
        logoutEmployee();
      }

      // sessionStorage.clear();

      sessionStorage.removeItem("app-active-user");
      sessionStorage.removeItem("app-active-token");
      sessionStorage.removeItem("app-active-refresh-token");

      setActiveUser(null);
      setActiveToken(null);
      setActiveRefreshToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        activeUser,
        activeToken,
        activeRefreshToken,
        setActiveUser,
        setActiveToken,
        setActiveRefreshToken,
        isEmployee,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useActiveAuthContext = () => useContext(AuthContext);
