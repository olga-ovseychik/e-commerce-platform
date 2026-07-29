import { createFileRoute } from '@tanstack/react-router'
import ProductDetails from "@/features/ProductDetails/ui/components/ProductDetails.tsx";

export const Route = createFileRoute('/products/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <ProductDetails id={id} />
}
