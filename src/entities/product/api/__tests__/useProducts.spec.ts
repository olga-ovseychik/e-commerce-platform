import { http, HttpResponse } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import { server } from "@/mocks/server.ts";
import { useProducts } from "@/entities/product/hooks/useProducts.ts";
import {createProvidersWrapper} from '@/shared/test/providersWrapper.tsx'
import type { JSX, ReactNode } from "react";


describe("Product API", () => {
  let Wrapper: ({children}: {children: ReactNode}) => JSX.Element;

  beforeEach(() => {
    vi.clearAllMocks()
    Wrapper = createProvidersWrapper();
  })

  test("should return all products", async () => {
    const {result} = renderHook(() => useProducts(1, 2), { wrapper: Wrapper })

    await waitFor(() => expect(result.current.data).toBeDefined())
  })

  test("should return no data", async () => {
    server.use(http.get(`${URL}/rest/v1/products`, () => {
      return HttpResponse.json([]);
    }))

    const Wrapper = createProvidersWrapper();

    const {result} = renderHook(() => useProducts(1, 2), { wrapper: Wrapper })

    await waitFor(() => expect(result.current.data).toBeDefined())

    expect(result.current.data?.productItems).toBeNull()
  })
})