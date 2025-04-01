
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "employer" | "admin";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: "student" | "employer") => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("gps_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, check against hardcoded credentials
      // In a real app, this would be an API call to your backend
      if (email === "student@example.com" && password === "password") {
        const userData: User = {
          id: "user1",
          name: "Alex Johnson",
          email: "student@example.com",
          role: "student",
          avatar: "https://i.pravatar.cc/150?u=user1"
        };
        
        setUser(userData);
        localStorage.setItem("gps_user", JSON.stringify(userData));
      } else if (email === "employer@example.com" && password === "password") {
        const userData: User = {
          id: "user2",
          name: "Sarah Miller",
          email: "employer@example.com",
          role: "employer",
          avatar: "https://i.pravatar.cc/150?u=user2"
        };
        
        setUser(userData);
        localStorage.setItem("gps_user", JSON.stringify(userData));
      } else if (email === "admin@example.com" && password === "password") {
        const userData: User = {
          id: "admin1",
          name: "David Clark",
          email: "admin@example.com",
          role: "admin",
          avatar: "https://i.pravatar.cc/150?u=admin1"
        };
        
        setUser(userData);
        localStorage.setItem("gps_user", JSON.stringify(userData));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: "student" | "employer") => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a new user
      // In a real app, this would be an API call to your backend
      const userData: User = {
        id: `user${Math.floor(Math.random() * 1000)}`,
        name,
        email,
        role,
        avatar: `https://i.pravatar.cc/150?u=${email}`
      };
      
      setUser(userData);
      localStorage.setItem("gps_user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gps_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
