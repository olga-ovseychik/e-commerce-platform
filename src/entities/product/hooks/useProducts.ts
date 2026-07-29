import { useQuery } from "@tanstack/react-query";
import { getAllProductItems } from "@/entities/product/api/product.api.ts";

export const useProducts = (page: number, limit: number) => {
  const from = (page - 1) * limit
  const to = from + limit - 1

  return useQuery({
    queryFn: () => getAllProductItems(from, to),
    queryKey: ["products", from, to],
  })
}