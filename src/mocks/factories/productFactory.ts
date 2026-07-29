import { faker } from '@faker-js/faker';
import type { Product } from "@/entities/product/model/types.ts";

export const productFactory = (overrides: Partial<Product> = {}) => {
  const mockProduct: Product = {
    id: faker.number.int(),
    brand: faker.company.name(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    discount: faker.number.float(),
    pricing_type: 'kg',
    price_per_kg: faker.number.float(),
    price_per_unit: null,
    image_url: 'https://placehold.co/300x300',
    product_items: [
      {
        product_id: faker.number.int(),
        weight: faker.number.float(),
        in_stock: true
      }]
  }

  return { ...mockProduct, ...overrides };
}