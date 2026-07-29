import type { Product } from "@/entities/product/model/types.ts";
import type { PostgrestError } from "@supabase/supabase-js";

export interface ProductsQueryData {
  productItems: Product[] | null;
  count: number | null;
  error: PostgrestError | null;
}