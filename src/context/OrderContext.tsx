"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "./CartContext";

export type OrderStatus =
  | "Order Placed"
  | "Confirmed"
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface RetailOrder {
  orderId: string;
  clerkUserId?: string;
  customerName: string;
  phone: string;
  email?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryCharge: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: "online" | "cod";
  paymentStatus: "Pending" | "Paid" | "Test Mode / Gateway Ready";
  orderStatus: OrderStatus;
  createdAt: string;
  trackingNumber: string;
  estimatedDelivery: string;
  statusHistory: { status: OrderStatus; timestamp: string; note: string }[];
}

interface OrderContextType {
  orders: RetailOrder[];
  createOrder: (orderData: Omit<RetailOrder, "orderId" | "createdAt" | "trackingNumber" | "estimatedDelivery" | "orderStatus" | "statusHistory">) => RetailOrder;
  getOrderById: (orderId: string) => RetailOrder | undefined;
  getOrdersForUser: (userId?: string, phone?: string) => RetailOrder[];
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  latestOrder: RetailOrder | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDER_STATUS_PROGRESSION: OrderStatus[] = [
  "Order Placed",
  "Confirmed",
  "Processing",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered"
];

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<RetailOrder[]>([]);
  const [latestOrder, setLatestOrder] = useState<RetailOrder | null>(null);

  // Load orders from localStorage
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("shiva_jadibuti_orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        setOrders(parsed);
        if (parsed.length > 0) {
          setLatestOrder(parsed[0]);
        }
      }
    } catch (e) {
      console.error("Failed to load orders from localStorage", e);
    }
  }, []);

  // Save orders to localStorage
  const saveOrders = (newOrders: RetailOrder[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem("shiva_jadibuti_orders", JSON.stringify(newOrders));
    } catch (e) {
      console.error("Failed to save orders to localStorage", e);
    }
  };

  const createOrder = (
    orderData: Omit<RetailOrder, "orderId" | "createdAt" | "trackingNumber" | "estimatedDelivery" | "orderStatus" | "statusHistory">
  ): RetailOrder => {
    const timestamp = new Date().toISOString();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const orderId = `SJS-${dateStr}-${randomSuffix}`;
    const trackingNumber = `DELHIVERY-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estimatedDelivery = deliveryDate.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    const newOrder: RetailOrder = {
      ...orderData,
      orderId,
      createdAt: timestamp,
      trackingNumber,
      estimatedDelivery,
      orderStatus: "Order Placed",
      statusHistory: [
        {
          status: "Order Placed",
          timestamp,
          note: "Order placed successfully. Awaiting dispatch confirmation."
        }
      ]
    };

    const updated = [newOrder, ...orders];
    saveOrders(updated);
    setLatestOrder(newOrder);
    return newOrder;
  };

  const getOrderById = (orderId: string): RetailOrder | undefined => {
    return orders.find(
      (o) => o.orderId.toLowerCase() === orderId.toLowerCase()
    );
  };

  const getOrdersForUser = (userId?: string, phone?: string): RetailOrder[] => {
    if (!userId && !phone) return orders;
    return orders.filter(
      (o) =>
        (userId && o.clerkUserId === userId) ||
        (phone && o.phone.replace(/\D/g, "") === phone.replace(/\D/g, ""))
    );
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const updated = orders.map((o) => {
      if (o.orderId === orderId) {
        return {
          ...o,
          orderStatus: status,
          statusHistory: [
            ...o.statusHistory,
            {
              status,
              timestamp: new Date().toISOString(),
              note: note || `Order transitioned to ${status}`
            }
          ]
        };
      }
      return o;
    });
    saveOrders(updated);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        getOrdersForUser,
        updateOrderStatus,
        latestOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
