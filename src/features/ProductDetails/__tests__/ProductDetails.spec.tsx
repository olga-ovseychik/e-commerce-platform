import { render, screen, cleanup } from "@testing-library/react";
import { createProvidersWrapper } from "@/shared/test/providersWrapper.tsx";
import type { JSX, ReactNode } from "react";
import { productFactory } from "@/mocks/factories/productFactory.ts";
import ProductDetails from "@/features/ProductDetails/ui/components/ProductDetails.tsx";
import { useGetProduct } from "@/features/ProductDetails/hooks/useGetProduct.ts";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Product } from "@/entities/product/model/types.ts";
import type { PostgrestError } from "@supabase/supabase-js";

interface ProductQueryData {
  productItem: Product[] | null;
  error: PostgrestError | null;
}

vi.mock('@/features/ProductDetails/hooks/useGetProduct.ts', () => ({
  useGetProduct: vi.fn()
}))

const mockProduct = productFactory()

describe('ProductDetails Component', () => {
  let Wrapper: ({children}: {children: ReactNode}) => JSX.Element;

  beforeEach(() => {
    Wrapper = createProvidersWrapper();

    vi.mocked(useGetProduct).mockReturnValue({
      data: {
        productItem: mockProduct,
        error: null
      },
      isPending: false
    } as unknown as UseQueryResult<ProductQueryData>)
  })

  afterEach(() => {
    cleanup()
  })

  test('should render product details', () => {
    render(
      <Wrapper>
        <ProductDetails id={String(mockProduct.id)}/>
      </Wrapper>
    );

    expect(screen.getByTestId('product-image')).toBeInTheDocument()
    expect(screen.getByTestId('product-name')).toHaveTextContent(`${mockProduct.name}`)
    expect(screen.getByTestId('product-weight')).toHaveTextContent(`${mockProduct.product_items[0].weight}`)
    expect(screen.getByTestId('product-brand')).toHaveTextContent(`${mockProduct.brand}`)
    expect(screen.getByTestId('product-price')).toHaveTextContent(`${mockProduct.price_per_kg ?? mockProduct.price_per_unit}`)
    expect(screen.getByTestId('product-add-to-cart-button')).toBeInTheDocument()
    expect(screen.getByTestId('product-add-to-list-button')).toBeInTheDocument()
    expect(screen.getByTestId('product-add-to-fav-button')).toBeInTheDocument()
    expect(screen.getByTestId('product-description')).toHaveTextContent(`${mockProduct.description}`)
    expect(screen.getByTestId('product-availability')).toHaveTextContent(`${mockProduct.product_items[0].in_stock ? 'Product is in stock' : 'Product out stock'}`)
  })

  test('should render loading indicator when pending state is true', () => {
    vi.mocked(useGetProduct).mockReturnValue({
      data: {
        productItem: mockProduct,
        error: null
      },
      isPending: true
    } as unknown as UseQueryResult<ProductQueryData>)

    render(
      <Wrapper>
        <ProductDetails id={String(mockProduct.id)}/>
      </Wrapper>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
  })

  test('should render error message when query is failed', () => {
    vi.mocked(useGetProduct).mockReturnValue({
      data: {
        productItem: mockProduct,
        error: 'error'
      },
      isPending: false,
      isError: true,
    } as unknown as UseQueryResult<ProductQueryData>)

    render(
      <Wrapper>
        <ProductDetails id={String(mockProduct.id)}/>
      </Wrapper>
    );

    expect(screen.getByTestId('error-message')).toBeInTheDocument()
  })
})