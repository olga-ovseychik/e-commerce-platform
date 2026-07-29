import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/entities/product/api/product.api.ts";

export const useGetProduct = (id: number) => {
  return useQuery({
    queryFn: () => getProductById(id),
    queryKey: ["products", id],
  })
}