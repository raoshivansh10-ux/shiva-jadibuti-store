"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  image: string;
  quantity: number;
  unit: string; // e.g. 'Kg', 'Quintal', 'Metric Ton'
  priceEstimate?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: { id: string; name: string; hindiName?: string; category: string; image: string; moq?: string }, quantity?: number, unit?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateUnit: (id: string, unit: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shiva_jadibuti_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("shiva_jadibuti_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = (
    product: { id: string; name: string; hindiName?: string; category: string; image: string; moq?: string },
    quantity: number = 100,
    unit: string = "Kg"
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id || item.name === product.name);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id || product.name,
            name: product.name,
            hindiName: product.hindiName,
            category: product.category,
            image: product.image,
            quantity: quantity,
            unit: unit
          }
        ];
      }
    });

    // Auto open cart or trigger notification feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id && item.name !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id || item.name === id ? { ...item, quantity } : item
      )
    );
  };

  const updateUnit = (id: string, unit: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id || item.name === id ? { ...item, unit } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + 1, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateUnit,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
