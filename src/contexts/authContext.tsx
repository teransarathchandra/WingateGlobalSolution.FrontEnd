import { createContext, useContext } from 'react';
// import useLocalStorage from '@app_hooks/useLocalStorage';
// import { loginSuccess } from '@app_redux/actions/authActions';
// import { useDispatch } from 'react-redux';
import useSessionStorage from '@app_hooks/useSessionStorage';
import IUser from '@app_interfaces/IUser';

// interface AuthContextType {
//     user: any; // Consider replacing `any` with a more specific type that matches your user object's shape
//     token: any;
//     setUser: () => void;
//     setToken: () => void;
//   }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   token: null,
//   setUser: () => {},
//   setToken: () => {},
// }); 

interface AuthContextType {
  user: IUser | null; // Updated type from `any`
  token: string | null; // Updated type from `any`
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setUser: () => { },
  setToken: () => { },
  logout: () => { },
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useSessionStorage('app-user');
  const [token, setToken] = useSessionStorage('app-token');

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);