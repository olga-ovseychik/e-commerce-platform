import type { Product } from "@/entities/product/model/types.ts";
import { productFactory } from "@/mocks/factories/productFactory.ts";

export const createMockProducts = (length: number) => {
  const mockProducts: Product[] = []

  for (let i=0; i<length; i++) {
    mockProducts.push(productFactory())
  }

  return mockProducts
}



