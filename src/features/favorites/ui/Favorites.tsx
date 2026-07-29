import ProductList from "@/features/ProductList/ui/components/ProductList.tsx";
import { useProducts } from "@/entities/product/hooks/useProducts.ts";
import { useFavorites } from "@/features/favorites/hooks/useFavorites.ts";


type Props = {
  page: number;
  limit: number;
}

export function Favorites({page, limit}: Readonly<Props>) {
  const {currentFavorites} = useFavorites()
  const {data, isPending} = useProducts(page, limit)

  const favorites = currentFavorites.map(id => data?.productItems?.find(product => product.id === id))

  if (currentFavorites.length === 0) {
    return (
      <div>No favorites yet</div>
    )
  }

  return <ProductList
    page={page}
    limit={limit}
    items={{productItems: favorites, count: favorites.length, error: null}}
    isPending={isPending}
  />
}
