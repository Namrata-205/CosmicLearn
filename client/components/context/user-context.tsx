import { createContext, useState, useContext, ReactNode } from "react";

type UserRole = "student" | "teacher" | null;

interface User {
  id: number;
  name: string;
  username: string;
  role: UserRole;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = user !== null && user?.role !== null;

  const logout = () => {
    setUser(null);
  };

  const setRole = (role: UserRole) => {
    if (!user) return;
    
    setUser({
      ...user,
      role,
      name: role === "student" ? "John" : "Prof. Taylor",
      username: role === "student" ? "john_student" : "prof_taylor",
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, logout, setRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
