import { http, HttpResponse } from 'msw'
import { createMockProducts } from "@/mocks/mockData.ts";

const URL = import.meta.env.VITE_SUPABASE_URL
const  mockProducts = createMockProducts(4)

export const handlers = [
  http.get(`${URL}/rest/v1/products`, () => {
    return HttpResponse.json(mockProducts);
  }),
  http.get(`${URL}/rest/v1/products?id=eq.1`, () => {
    return HttpResponse.json(mockProducts[0]);
  }),
]