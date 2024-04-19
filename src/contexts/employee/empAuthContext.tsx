import { createContext, useContext } from "react";
import useSessionStorage from "@app_hooks/useSessionStorage";
import IEmployee from "@app_interfaces/IEmployee";
interface AuthContextType {
  employee: IEmployee | null;
  employeeToken: string | null;
  employeeRefreshToken: string | null;
  setEmployee: (employee: IEmployee | null) => void;
  setToken: (employeeToken: string | null) => void;
  setRefreshToken: (employeeToken: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  employee: null,
  employeeToken: null,
  employeeRefreshToken: null,
  setEmployee: () => {},
  setToken: () => {},
  setRefreshToken: () => {},
  logout: () => {},
});

export const AuthEmpContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employee, setEmployee] = useSessionStorage("app-employee");
  const [employeeToken, setToken] = useSessionStorage("app-emp-token");
  const [employeeRefreshToken, setRefreshToken] = useSessionStorage(
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
        employeeToken,
        setToken,
        employeeRefreshToken,
        setRefreshToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useEmpAuthContext = () => useContext(AuthContext);
