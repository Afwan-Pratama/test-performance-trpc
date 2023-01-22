import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany()
  }),
  addProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        material: z.string(),
        imageUrl: z.string(),
        price: z.string(),
        supplierId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.create({
        data: input,
      })
    }),
})
