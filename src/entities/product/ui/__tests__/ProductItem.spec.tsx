import { render, screen } from "@testing-library/react";
import {createProvidersWrapper} from '@/shared/test/providersWrapper.tsx'
import ProductItem from "@/entities/product/ui/components/ProductItem.tsx";
import { mockProducts } from "@/mocks/mockData.ts";
import { calcPrice } from "@/shared/lib/calcPrice.ts";
import { calcDiscount } from "@/shared/lib/calcDiscount.ts";

const getElements = () => {
  return {
    productsListBtn: screen.getByTestId('products-list-button'),
    productsList: screen.getByTestId('products-lis-menu'),
    productImage: screen.getByTestId('product-image'),
    productBrand: screen.getByTestId('product-brand'),
    productName: screen.getByTestId('product-name'),
    productWeight: screen.getByTestId('product-weight'),
    productWeightType: screen.getByTestId('product-weight-type'),
    productDiscount: screen.getByTestId('product-discount'),
    productPrice: screen.getByTestId('product-price'),
    productAvailability: screen.getByTestId('product-availability'),
    subtractQuantityButton: screen.getByTestId('subtract-quantity-button'),
    addQuantityButton: screen.getByTestId('add-quantity-button'),
    addToCartButton: screen.getByTestId('add-to-cart-button'),
  }
}

const price = calcPrice(
  mockProducts[0].price_per_kg ?? mockProducts[0].price_per_unit,
  mockProducts[0].product_items[0].weight,
  mockProducts[0].pricing_type
)

describe("ProductItem", () => {
  test("should render correctly", async () => {
    const Wrapper = createProvidersWrapper()

    render(
      <Wrapper>
        <ProductItem item={mockProducts[0]} />
      </Wrapper>
    )

    const elements = getElements()

    expect(elements.productsListBtn).toBeInTheDocument()
    expect(elements.productsList).toHaveClass('hidden')
    expect(elements.productImage).toHaveAttribute('src', `${mockProducts[0].image_url}`)
    expect(elements.productBrand).toHaveTextContent(mockProducts[0].brand)
    expect(elements.productName).toHaveTextContent(mockProducts[0].name)
    expect(elements.productWeight).toHaveTextContent(`${mockProducts[0].product_items[0].weight}g`)
    expect(elements.productWeightType).toHaveTextContent(`$${mockProducts[0].price_per_kg} / ${mockProducts[0].pricing_type}`)
    expect(elements.productDiscount).toHaveTextContent((calcDiscount(price, mockProducts[0].discount))!.toString())
    expect(elements.productPrice).toHaveTextContent(`$${price}`)
    expect(elements.productAvailability).toHaveTextContent('')
    expect(elements.subtractQuantityButton).toBeInTheDocument()
    expect(elements.addQuantityButton).toBeInTheDocument()
    expect(elements.addToCartButton).toBeInTheDocument()
  })
})