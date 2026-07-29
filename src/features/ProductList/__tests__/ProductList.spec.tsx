import type { ReactNode, JSX } from "react";
import ProductList from "@/features/ProductList/ui/components/ProductList.tsx";
import { render, waitFor, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {createProvidersWrapper} from '@/shared/test/providersWrapper.tsx'
import { useProducts } from "@/entities/product/hooks/useProducts.ts";
import type { UseQueryResult } from "@tanstack/react-query";
import { createMockProducts } from "@/mocks/mockData.ts";
import type { ProductsQueryData } from "@/shared/types.ts";


const mockNavigate = vi.fn()

window.scrollTo = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({ navigate: mockNavigate })
}))

vi.mock('@/entities/product/hooks/useProducts.ts', () => ({
  useProducts: vi.fn()
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

describe('ProductList', () => {
  let Wrapper: ({children}: {children: ReactNode}) => JSX.Element;

  beforeEach(() => {
    Wrapper = createProvidersWrapper()
    mockNavigate.mockClear()
    vi.mocked(window.scrollTo).mockClear()

    vi.mocked(useProducts).mockReturnValue({
      data: {
        productItems: mockProducts,
        count: mockProducts.length,
        error: null
      },
      isPending: false
    } as unknown as UseQueryResult<ProductsQueryData>)
  })

  afterEach(() => {
    cleanup()
  })

  test('should render the correct number of ProductItem components when data is populated', async () => {
    render(
      <Wrapper>
        <ProductList {...mockProps}/>
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('products-list')).toBeInTheDocument()
    })
  })

  test('should show loading indicator when isPending is true', async () => {
    vi.mocked(useProducts).mockReturnValue({
      isPending: true,
    } as unknown as UseQueryResult<ProductsQueryData, Error>)

    render(
      <Wrapper>
        <ProductList {...mockProps}/>
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
    })
  })

  test('should renders "No products yet" if no data return', async () => {
    vi.mocked(useProducts).mockReturnValue({
      data: { productItems: undefined, isPending: false, error: null },
    } as unknown as UseQueryResult<ProductsQueryData, Error>)

    render(
      <Wrapper>
        <ProductList {...mockProps}/>
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('No products yet.')).toBeInTheDocument()
    })
  })

  test('should disable the prev button when page is 1', async () => {
    render(
      <Wrapper>
        <ProductList {...mockProps}/>
      </Wrapper>
    );

    const prevButton = screen.getByTestId('prev-button')
    expect(prevButton).toBeDisabled()
  })

  test('should disable the next button when page is total', async () => {
    const props = {...mockProps, page: 2}

    render(
      <Wrapper>
        <ProductList {...props} />
      </Wrapper>
    );

    const nextButton = screen.getByTestId('next-button')
    expect(nextButton).toBeDisabled()
  })

  test('should call router.navigate() with the correct page when next button is clicked', async () => {
    render(
      <Wrapper>
        <ProductList {...mockProps}/>
      </Wrapper>
    );

    const page = 1
    const limit = 2

    const nextButton = screen.getByTestId('next-button')
    await userEvent.click(nextButton)
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/products', search: {page: page+1, limit}})
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })

  test('should call router.navigate() with the correct page when prev button is clicked', async () => {
    const props = {...mockProps, page: 2}

    render(
      <Wrapper>
        <ProductList {...props}/>
      </Wrapper>
    );

    const page = 2
    const limit = 2

    const prevButton = screen.getByTestId('prev-button')
    await userEvent.click(prevButton)
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/products', search: {page: page > 1 ? page-1 : page, limit}})
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })

  test('should call router.navigate() with the correct page when page button with 2 is clicked', async () => {
    render(
      <Wrapper>
        <ProductList {...mockProps}/>
      </Wrapper>
    );

    const page = 2
    const limit = 2

    const pageButtons = screen.getAllByTestId('page-button')
    await userEvent.click(pageButtons[1])
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/products', search: {page: page, limit}})
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})