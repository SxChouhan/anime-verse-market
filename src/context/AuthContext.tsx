
import { createContext, useState, useContext, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock login for now - will be replaced with actual Supabase auth
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock user
        const mockUser = {
          id: "user-1",
          name: "Anime Fan",
          email: email,
        };
        
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const signup = async (email: string, name: string, password: string) => {
    setIsLoading(true);
    
    // Mock signup for now - will be replaced with actual Supabase auth
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock user
        const mockUser = {
          id: "user-" + Date.now(),
          name: name,
          email: email,
        };
        
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
