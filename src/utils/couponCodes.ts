export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  description: string;
}

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: "HERBAL10",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 499,
    description: "10% OFF on retail orders above ₹499",
  },
  {
    code: "SHIVA100",
    discountType: "fixed",
    discountValue: 100,
    minOrderAmount: 999,
    description: "Flat ₹100 OFF on retail orders above ₹999",
  },
  {
    code: "WELCOME50",
    discountType: "fixed",
    discountValue: 50,
    minOrderAmount: 299,
    description: "Flat ₹50 OFF for first-time retail buyers",
  },
  {
    code: "AYURVEDA15",
    discountType: "percentage",
    discountValue: 15,
    minOrderAmount: 1499,
    description: "15% OFF on bulk retail orders above ₹1,499",
  },
];

export function applyCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
  const cleanCode = code.trim().toUpperCase();
  const coupon = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);

  if (!coupon) {
    return { valid: false, discount: 0, message: "Invalid coupon code. Try HERBAL10 or SHIVA100." };
  }

  if (subtotal < coupon.minOrderAmount) {
    return {
      valid: false,
      discount: 0,
      message: `Coupon ${coupon.code} requires a minimum order of ₹${coupon.minOrderAmount}.`,
    };
  }

  let discount = 0;
  if (coupon.discountType === "percentage") {
    discount = Math.round((subtotal * coupon.discountValue) / 100);
  } else {
    discount = coupon.discountValue;
  }

  return {
    valid: true,
    discount,
    message: `Coupon ${coupon.code} applied! Saved ₹${discount}.`,
    coupon,
  };
}
