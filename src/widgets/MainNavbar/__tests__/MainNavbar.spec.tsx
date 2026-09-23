import { screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import { MainNavbar } from "@/widgets/MainNavbar/ui/MainNavbar.tsx";
import { renderWithFileRoutes } from "@/shared/test/file-route-utils.tsx";

describe('MainNavbar component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render navigation elements', async () => {
    const { router } = renderWithFileRoutes(<MainNavbar />, {
      initialLocation: '/',
    })

    await router.load()

    expect(router.state.location.pathname).toBe('/')
    expect(screen.getByTestId('logo')).toBeInTheDocument()
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
    expect(screen.getByTestId('search-button')).toBeInTheDocument()
    expect(screen.getByTestId('nav-actions')).toBeInTheDocument()
  })
})