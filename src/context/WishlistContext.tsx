"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  image: string;
  moq?: string;
  botanicalName?: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (isOpen: boolean) => void;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("shiva_jadibuti_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage", e);
    }
  }, []);

  // Save wishlist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("shiva_jadibuti_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist]);

  const addToWishlist = (product: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id || item.name === product.name)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id && item.name !== id));
  };

  const toggleWishlist = (product: WishlistItem) => {
    if (isInWishlist(product.id || product.name)) {
      removeFromWishlist(product.id || product.name);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id || item.name === id);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const totalWishlistItems = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        totalWishlistItems
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
