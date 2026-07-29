import * as z from 'zod'

export const productsSearchSchema  = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(9).default(9),
})