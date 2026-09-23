import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import {
  createRouter,
  RouterProvider,
  createMemoryHistory, type AnyContext,
} from '@tanstack/react-router'

import { routeTree } from '@/routeTree.gen.ts'

export function createTestRouterFromFiles(initialLocation = '/') {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: {},
  })

  return router
}

interface RenderWithFileRoutesOptions extends Omit<RenderOptions, 'wrapper'> {
  initialLocation?: string
  routerContext?: AnyContext
}

export function renderWithFileRoutes(
  ui: React.ReactElement,
  {
    initialLocation = '/',
    routerContext = {},
    ...renderOptions
  }: RenderWithFileRoutesOptions = {},
) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: routerContext,
  })

  function Wrapper() {
    return <RouterProvider router={router}></RouterProvider>
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    router,
  }
}

export function createMockFileRoute(
  path: string,
  component: React.ComponentType,
) {
  return {
    path,
    component,
  }
}