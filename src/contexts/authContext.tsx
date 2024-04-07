import { createContext, useContext } from 'react';
// import useLocalStorage from '@app_hooks/useLocalStorage';
// import { loginSuccess } from '@app_redux/actions/authActions';
// import { useDispatch } from 'react-redux';
import useLocalStorage from '@app_hooks/useLocalStorage';
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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
}); 

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    // const [user, setUser] = useState<AuthContextType['user']>(null);
    const [user, setUser] = useLocalStorage('app-user');
    const [token, setToken] = useLocalStorage('app-token');
    // const [isInitialized, setIsInitialized] = useState<boolean>(false);
    // const dispatch = useDispatch(); // Now actively used to dispatch loginSuccess action

    // useEffect(() => {
    //     const loadUserData = async () => {
    //         // Implement secure fetching of user data
    //         try {
    //             // Example: Fetch user data securely from backend
    //             // For demonstration, using localStorage (consider using secure storage)
    //             const storedUser = localStorage.getItem('user'); // Encapsulate local storage access within useLocalStorage hook
    //             if (storedUser) {
    //                 const parsedUser = JSON.parse(storedUser);
    //                 setUser(parsedUser);
    //                 dispatch(loginSuccess(parsedUser)); // Dispatch Redux action on successful user load
    //             }
    //             setIsInitialized(true);
    //         } catch (error) {
    //             console.error("Failed to load user data:", error);
    //             // Handle loading error (e.g., invalid token, failed decryption)
    //         }
    //     };

    //     loadUserData();
    // }, [dispatch]);

    return (
        // <AuthContext.Provider value={{ user, setUser, token, setToken, isInitialized }}>
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
          {children}
        </AuthContext.Provider>
      );
};

export const useAuthContext = () => useContext(AuthContext);