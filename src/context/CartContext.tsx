"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { applyCoupon as calculateCouponDiscount } from "@/utils/couponCodes";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  hindiName?: string;
  category: string;
  image: string;
  itemType: "retail" | "wholesale";
  size?: string; // e.g. "100 g", "250 g", "500 g", "1 Kg"
  price: number; // INR selling price
  mrp?: number; // MRP
  quantity: number;
  unit: string; // "Pouch", "Pack", "Kg", "Quintal", "Metric Ton"
  stock?: number;
}

export interface AddProductPayload {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  image: string;
  moq?: string;
  retailPrice?: number;
}

export interface AddVariantPayload {
  id: string;
  size: string;
  price: number;
  mrp?: number;
  stock?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: AddProductPayload,
    quantity?: number,
    unit?: string,
    size?: string,
    price?: number,
    mrp?: number,
    itemType?: "retail" | "wholesale"
  ) => void;
  addRetailItem: (product: AddProductPayload, variant: AddVariantPayload, quantity?: number) => void;
  addWholesaleItem: (product: AddProductPayload, quantity?: number, unit?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateUnit: (id: string, unit: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  grandTotal: number;
  appliedCoupon: string | null;
  couponMessage: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  hasRetailItems: boolean;
  hasWholesaleItems: boolean;
  isBulkOrderDetected: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shiva_jadibuti_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        // Normalize legacy wholesale cart items if any
        const normalized = parsed.map((item: any) => ({
          id: item.id || item.name,
          productId: item.productId || item.id || item.name,
          name: item.name,
          hindiName: item.hindiName,
          category: item.category || "Herbs",
          image: item.image || "/images/ashwagandha_minimal.png",
          itemType: item.itemType || (item.unit === "Kg" || item.unit === "Quintal" || item.unit === "Metric Ton" ? "wholesale" : "retail"),
          size: item.size || (item.itemType === "retail" ? "250 g" : undefined),
          price: item.price || (item.itemType === "retail" ? 249 : 0),
          mrp: item.mrp || (item.itemType === "retail" ? 320 : undefined),
          quantity: item.quantity || 1,
          unit: item.unit || "Kg"
        }));
        setCart(normalized);
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

  // Recalculate coupon discount whenever cart changes
  useEffect(() => {
    if (appliedCoupon) {
      const retailSubtotal = cart
        .filter((i) => i.itemType === "retail")
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

      const res = calculateCouponDiscount(appliedCoupon, retailSubtotal);
      if (res.valid) {
        setCouponDiscount(res.discount);
        setCouponMessage(res.message);
      } else {
        setAppliedCoupon(null);
        setCouponDiscount(0);
        setCouponMessage(res.message);
      }
    } else {
      setCouponDiscount(0);
      setCouponMessage(null);
    }
  }, [cart, appliedCoupon]);

  const addToCart = (
    product: AddProductPayload,
    quantity: number = 1,
    unit: string = "Pack",
    size: string = "250 g",
    price: number = 249,
    mrp: number = 320,
    itemType: "retail" | "wholesale" = "retail"
  ) => {
    const compositeId = itemType === "retail"
      ? `${product.id}-${size.replace(/\s+/g, "").toLowerCase()}`
      : `${product.id}-wholesale`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === compositeId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: compositeId,
            productId: product.id,
            name: product.name,
            hindiName: product.hindiName,
            category: product.category,
            image: product.image,
            itemType,
            size: itemType === "retail" ? size : undefined,
            price: itemType === "retail" ? price : 0,
            mrp: itemType === "retail" ? mrp : undefined,
            quantity,
            unit
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const addRetailItem = (
    product: AddProductPayload,
    variant: AddVariantPayload,
    quantity: number = 1
  ) => {
    addToCart(
      product,
      quantity,
      "Pouch",
      variant.size,
      variant.price,
      variant.mrp || Math.round(variant.price * 1.3),
      "retail"
    );
  };

  const addWholesaleItem = (
    product: AddProductPayload,
    quantity: number = 100,
    unit: string = "Kg"
  ) => {
    addToCart(
      product,
      quantity,
      unit,
      undefined,
      0,
      undefined,
      "wholesale"
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateUnit = (id: string, unit: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, unit } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponMessage(null);
  };

  const applyCoupon = (code: string): boolean => {
    const retailSubtotal = cart
      .filter((i) => i.itemType === "retail")
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const res = calculateCouponDiscount(code, retailSubtotal);
    if (res.valid) {
      setAppliedCoupon(res.coupon?.code || code.toUpperCase());
      setCouponDiscount(res.discount);
      setCouponMessage(res.message);
      return true;
    } else {
      setCouponMessage(res.message);
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponMessage(null);
  };

  // Calculations
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart
    .filter((i) => i.itemType === "retail")
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryCharge = subtotal > 0 ? (subtotal >= 999 ? 0 : 70) : 0;
  const grandTotal = Math.max(0, subtotal - couponDiscount + deliveryCharge);

  const hasRetailItems = cart.some((i) => i.itemType === "retail");
  const hasWholesaleItems = cart.some((i) => i.itemType === "wholesale");

  const isBulkOrderDetected = cart.some(
    (i) =>
      i.itemType === "wholesale" ||
      i.unit === "Quintal" ||
      i.unit === "Metric Ton" ||
      (i.unit === "Kg" && i.quantity >= 25)
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addRetailItem,
        addWholesaleItem,
        removeFromCart,
        updateQuantity,
        updateUnit,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        discount: couponDiscount,
        deliveryCharge,
        grandTotal,
        appliedCoupon,
        couponMessage,
        applyCoupon,
        removeCoupon,
        hasRetailItems,
        hasWholesaleItems,
        isBulkOrderDetected
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
