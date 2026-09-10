import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainNavbar } from "@/widgets/MainNavbar/ui/MainNavbar.tsx";
import { CategoryNavbar } from "@/widgets/CategoryNavbar/ui/CategoryNavbar.tsx";

const queryClient = new QueryClient()


const RootLayout = () => (
  <>
    <QueryClientProvider client={queryClient}>
      <MainNavbar />
      <CategoryNavbar />
      <Outlet />
    </QueryClientProvider>
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })