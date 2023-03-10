import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const supplierRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    console.log(
      'memory usage :',
      process.memoryUsage().heapUsed / 1024 / 1024,
      'MB'
    )
    return ctx.prisma.supplier.findMany()
  }),
  getAllWithProduct: publicProcedure.query(({ ctx }) => {
    console.log(
      'memory usage :',
      process.memoryUsage().heapUsed / 1024 / 1024,
      'MB'
    )
    return ctx.prisma.supplier.findMany({
      include: {
        product: {
          select: {
            name: true,
            price: true,
            material: true,
            description: true,
            imageUrl: true,
          },
        },
      },
    })
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
