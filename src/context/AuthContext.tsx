"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  phone?: string;
  gstNumber?: string;
  businessType?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, pass: string) => boolean;
  signup: (details: Partial<UserProfile>) => boolean;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Load user session from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("shiva_jadibuti_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    }
  }, []);

  const login = (email: string, pass: string) => {
    // Simulated authentication for demo
    const mockUser: UserProfile = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0].toUpperCase() || "Wholesale Buyer",
      email: email,
      companyName: "Ayurvedic Remedies Ltd",
      phone: "+91 98765 43210",
      businessType: "Ayurvedic Medicine Manufacturer"
    };
    setUser(mockUser);
    localStorage.setItem("shiva_jadibuti_user", JSON.stringify(mockUser));
    setIsAuthModalOpen(false);
    return true;
  };

  const signup = (details: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: details.name || "Valued Partner",
      email: details.email || "buyer@company.com",
      companyName: details.companyName || "Herbal Enterprises",
      phone: details.phone || "+91 98765 43210",
      gstNumber: details.gstNumber || "",
      businessType: details.businessType || "Wholesale Trader"
    };
    setUser(newUser);
    localStorage.setItem("shiva_jadibuti_user", JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shiva_jadibuti_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
