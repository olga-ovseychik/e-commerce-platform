import { supabase } from "@/app/supabase/supabase.ts";

export async function getAllProductItems(from: number, to: number) {
  const { data, count, error } = await supabase
    .from('products')
    .select('*, product_items(*)', {count: "exact"})
    .range(from, to);

  return { productItems: data, count, error }
}

export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_items(*)', {count: "exact"})
    .eq('id', id)
    .single()

  return { productItem: data, error }
}