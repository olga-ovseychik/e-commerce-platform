import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import type { ReactNode } from "react";

export const createProvidersWrapper = () => {
  const queryClient = new QueryClient({defaultOptions: { queries: { retry: false, gcTime: 0, staleTime: 0 } }});

  return ({ children }: {children: ReactNode}) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
  )
}