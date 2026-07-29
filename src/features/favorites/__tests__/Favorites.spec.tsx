import type { JSX, ReactNode } from "react";
import { createProvidersWrapper } from "@/shared/test/providersWrapper.tsx";
import { useProducts } from "@/entities/product/hooks/useProducts.ts";
import type { UseQueryResult } from "@tanstack/react-query";
import { createMockProducts } from "@/mocks/mockData.ts";
import type { ProductsQueryData } from "@/shared/types.ts";
import { render, screen } from "@testing-library/react";
import { Favorites } from "@/features/favorites/ui/Favorites.tsx";
import { useFavorites } from "@/features/favorites/hooks/useFavorites.ts";

vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({ navigate: vi.fn() })
}))

vi.mock('@/entities/product/hooks/useProducts.ts', () => ({
  useProducts: vi.fn()
}))

vi.mock('@/features/favorites/hooks/useFavorites.ts', () => ({
  useFavorites: vi.fn()
}))

const mockProducts = createMockProducts(4)

const mockProps = {
  limit: 2,
  page: 1,
  items: {
    productItems: mockProducts,
    count: mockProducts.length,
    error: null
  },
  isPending: false,
}

describe('Favorites component', () => {
  let Wrapper: ({children}: {children: ReactNode}) => JSX.Element;

  beforeEach(() => {
    Wrapper = createProvidersWrapper()

    vi.mocked(useProducts).mockReturnValue({
      data: {
        productItems: mockProducts,
        count: mockProducts.length,
        error: null
      },
      isPending: false
    } as unknown as UseQueryResult<ProductsQueryData>)
  })

  test('should render favorites', async () => {
    vi.mocked(useFavorites).mockReturnValue({
      currentFavorites: [mockProducts[0].id],
      addToFavorites: vi.fn(),
      removeFromFavorites: vi.fn(),
      isFavorite: vi.fn(),
    })

    render(
      <Wrapper>
        <Favorites {...mockProps}/>
      </Wrapper>
    );

    expect(screen.getAllByTestId('product-item')).toHaveLength(1)
  })

  test('should render no favorites message when no favorites are saved', async () => {
    vi.mocked(useFavorites).mockReturnValue({
      currentFavorites: [],
      addToFavorites: vi.fn(),
      removeFromFavorites: vi.fn(),
      isFavorite: vi.fn(),
    })

    render(
      <Wrapper>
        <Favorites {...mockProps}/>
      </Wrapper>
    );

    expect(screen.queryAllByTestId('product-item')).toHaveLength(0)
  })
})