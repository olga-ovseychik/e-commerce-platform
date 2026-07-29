import type { PricingType } from "@/entities/product/model/types.ts";

export const calcPrice =
  (price: number | null, weight: number, price_type: PricingType) => {
  if (price_type === "kg" && price) {
    return Number((weight * price).toFixed(2));
  } else {
    return price
  }
}