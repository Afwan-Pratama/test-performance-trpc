import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const supplierRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.supplier.findMany()
  }),
  addSupplier: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        address: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.supplier.create({
        data: input,
      })
    }),
})
