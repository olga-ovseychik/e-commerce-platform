import { createFileRoute } from '@tanstack/react-router'
import { productsSearchSchema } from "@/features/ProductList/model/productsSearchSchema.ts";
import { Favorites } from "@/features/favorites/ui/Favorites.tsx";

export const Route = createFileRoute('/favorites/')({
  validateSearch: productsSearchSchema,
  component: FavoritesPage,
})

function FavoritesPage() {
  const { page, limit } = Route.useSearch()

  return (
    <Favorites page={page} limit={limit} />
  )
}
