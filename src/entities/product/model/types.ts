import type { ProductItem } from "@/entities/product-item/model/types.ts";

export type Product = {
  id: number;
  brand: string;
  name: string;
  description: string;
  pricing_type: PricingType;
  price_per_kg: number | null;
  price_per_unit: number | null;
  discount: number;
  image_url: string;
  product_items: ProductItem[];
}

export type ProductItemProps = {
  item: Product;
}

export type PricingType = 'kg' | 'unit'