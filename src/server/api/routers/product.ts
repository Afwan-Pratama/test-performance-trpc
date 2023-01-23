import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany()
  }),
  getAllWithSupplier: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      include: {
        supplier: {
          select: {
            name: true,
            description: true,
            address: true,
          },
        },
      },
    })
  }),
  getAllWithLimit: publicProcedure
    .input(z.object({ limit: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        take: input.limit,
      })
    }),
  getAllWithPagination: publicProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        skip: input.limit * input.page + 1,
        take: input.limit,
      })
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
