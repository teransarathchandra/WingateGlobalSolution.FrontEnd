import { createContext, useContext } from "react";
import useSessionStorage from "@app_hooks/useSessionStorage";
import IEmployee from "@app_interfaces/IEmployee";
interface AuthContextType {
  employee: IEmployee | null;
  employeeToken: string | null;
  employeeRefreshToken: string | null;
  setEmployee: (employee: IEmployee | null) => void;
  setEmployeeToken: (employeeToken: string | null) => void;
  setEmployeeRefreshToken: (employeeToken: string | null) => void;
  logoutEmployee: () => void;
}

const AuthContext = createContext<AuthContextType>({
  employee: null,
  employeeToken: null,
  employeeRefreshToken: null,
  setEmployee: () => {},
  setEmployeeToken: () => {},
  setEmployeeRefreshToken: () => {},
  logoutEmployee: () => {},
});

export const AuthEmployeeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employee, setEmployee] = useSessionStorage("app-emp");
  const [employeeToken, setEmployeeToken] = useSessionStorage("app-emp-token");
  const [employeeRefreshToken, setEmployeeRefreshToken] = useSessionStorage(
    "app-emp-refresh-token"
  );

  const logoutEmployee = () => {
    sessionStorage.removeItem("app-emp");
    sessionStorage.removeItem("app-emp-token");
    sessionStorage.removeItem("app-emp-refresh-token");

    setEmployee(null);
    setEmployeeToken(null);
    setEmployeeRefreshToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        employee,
        setEmployee,
        employeeToken,
        setEmployeeToken,
        employeeRefreshToken,
        setEmployeeRefreshToken,
        logoutEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useEmployeeAuthContext = () => useContext(AuthContext);
