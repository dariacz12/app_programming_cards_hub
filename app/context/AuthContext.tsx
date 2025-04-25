import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (name: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  onChangePassword?: (
    password: string,
    passwordConfirmation: string,
    code: string,
  ) => Promise<any>;
  loading?: boolean;
}
const TOKEN_KEY = "my-jwt";
export const API_URL = "http://192.168.233.20:1337/api";
export const UPLOADS_URL = "http://192.168.233.20:1337";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });
  const [loading, setLoading] = useState(true); // New loading state
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        console.log(token);
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState({
            token: token,
            authenticated: true,
          });
        } else {
          setAuthState({
            token: null,
            authenticated: false,
          });
        }
      } catch (error) {
        console.error("Error loading token:", error);
        setAuthState({
          token: null,
          authenticated: false,
        });
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/auth/local/register`, {
        username: name,
        email,
        password,
      });
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response?.error?.message || "An unknown error occurred",
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/local`, {
        identifier: email,
        password,
      });

      setAuthState({
        token: result.data.jwt,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${result.data.jwt}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.jwt);
      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.error.message };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const changePassword = async (
    password: string,
    passwordConfirmation: string,
    code: string,
  ) => {
    try {
      return await axios.post(`${API_URL}/auth/reset-password`, {
        password,
        passwordConfirmation,
        code,
      });
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response?.error?.message || "An unknown error occurred",
      };
    }
  };

  const value = {
    onChangePassword: changePassword,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
