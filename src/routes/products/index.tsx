import { createFileRoute } from '@tanstack/react-router'
import ProductList from "@/features/ProductList/ui/components/ProductList.tsx";
import { productsSearchSchema } from "@/features/ProductList/model/productsSearchSchema.ts";
import { useProducts } from "@/entities/product/hooks/useProducts.ts";

export const Route = createFileRoute('/products/')({
  validateSearch: productsSearchSchema,
  component: ProductsPage,
})

function ProductsPage() {
  const { page, limit } = Route.useSearch()
  const {data, isPending} = useProducts(page, limit)

  return <ProductList page={page} limit={limit} items={data} isPending={isPending} />
}
