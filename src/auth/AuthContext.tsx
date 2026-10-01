import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { authConfig } from "../config/authConfig";
import { initDatabase } from "../storage/FileStorage";
import { AuthResult, login as loginService } from "./AuthService";

interface SessionUser {
  id: number;
  email: string;
  nombre: string;
  fechaRegistro: string;
}

interface AuthContextType {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inicialización: crear DB si no existe + restaurar sesión
  useEffect(() => {
    (async () => {
      try {
        await initDatabase();

        const storedUser = await AsyncStorage.getItem(
          authConfig.SESSION_USER_KEY,
        );
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error inicializando auth:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signIn = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    const result = await loginService(email, password);

    if (result.success && result.user) {
      await AsyncStorage.setItem(
        authConfig.SESSION_USER_KEY,
        JSON.stringify(result.user),
      );
      setUser(result.user);
    }

    return result;
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(authConfig.SESSION_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
