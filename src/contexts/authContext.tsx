import { createContext, useContext } from 'react';
import useSessionStorage from '@app_hooks/useSessionStorage';
import IUser from '@app_interfaces/IUser';
interface AuthContextType {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  refreshToken: null,
  setUser: () => { },
  setToken: () => { },
  setRefreshToken: () => { },
  logout: () => { },
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useSessionStorage('app-user');
  const [token, setToken] = useSessionStorage('app-token');
  const [refreshToken, setRefreshToken] = useSessionStorage('app-refresh-token');

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, refreshToken, setRefreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);