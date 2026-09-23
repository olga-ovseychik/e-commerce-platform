import { screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import { CategoryNavbar } from "@/widgets/CategoryNavbar/ui/CategoryNavbar.tsx";
import { renderWithFileRoutes } from "@/shared/test/file-route-utils.tsx";

describe('CategoryNavbar component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render navigation elements', async () => {
    const { router } = renderWithFileRoutes(<CategoryNavbar />, {
      initialLocation: '/',
    })

    await router.load()

    expect(router.state.location.pathname).toBe('/')
    expect(screen.getByTestId('category-select')).toBeInTheDocument()
    expect(screen.getByTestId('nav-links')).toBeInTheDocument()
  })
})