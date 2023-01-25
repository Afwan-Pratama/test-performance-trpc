import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    console.log(
      'memory usage :',
      process.memoryUsage().heapUsed / 1024 / 1024,
      'MB'
    )
    return ctx.prisma.product.findMany()
  }),
  getAllWithSupplier: publicProcedure.query(({ ctx }) => {
    console.log(
      'memory usage :',
      process.memoryUsage().heapUsed / 1024 / 1024,
      'MB'
    )
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
      console.log(
        'memory usage :',
        process.memoryUsage().heapUsed / 1024 / 1024,
        'MB'
      )
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
      console.log(
        'memory usage :',
        process.memoryUsage().heapUsed / 1024 / 1024,
        'MB'
      )
      return ctx.prisma.product.findMany({
        skip: input.limit * input.page + 1,
        take: input.limit,
      })
    }),
  getAllWithFiltering: publicProcedure
    .input(
      z.object({
        id: z.string().nullish(),
        name: z.string().nullish(),
        material: z.string().nullish(),
        supplierId: z.string().nullish(),
      })
    )
    .query(({ input, ctx }) => {
      type dictionaryProduct = { [index: string]: string | null | undefined }
      const obj: object[] = []

      const newProduct: dictionaryProduct = {
        name: input.name?.toLowerCase(),
        material: input.material?.toLowerCase(),
        supplierId: input.supplierId,
      }
      for (let i = 0; i < Object.keys(newProduct).length; i++) {
        const indexObj: string = Object.keys(newProduct)[i]
        if (newProduct[indexObj]) {
          obj.push({ [indexObj]: newProduct[indexObj] })
        }
      }
      console.log(
        'memory usage :',
        process.memoryUsage().heapUsed / 1024 / 1024,
        'MB'
      )
      return ctx.prisma.product.findMany({
        where: {
          AND: obj,
        },
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
      console.log(
        'memory usage :',
        process.memoryUsage().heapUsed / 1024 / 1024,
        'MB'
      )
      return ctx.prisma.product.create({
        data: {
          name: input.name.toLowerCase(),
          description: input.description.toLocaleLowerCase(),
          material: input.material.toLowerCase(),
          imageUrl: input.imageUrl,
          price: input.price,
          supplierId: input.supplierId,
        },
      })
    }),
  updateProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().nullish(),
        material: z.string().nullish(),
        imageUrl: z.string().nullish(),
        price: z.string().nullish(),
        description: z.string().nullish(),
        supplierId: z.string().nullish(),
      })
    )
    .mutation(({ input, ctx }) => {
      type dictionaryProduct = { [index: string]: string | null | undefined }
      const obj: dictionaryProduct = {}

      const newProduct: dictionaryProduct = {
        name: input.name?.toLowerCase(),
        material: input.material?.toLowerCase(),
        imageUrl: input.imageUrl,
        price: input.price,
        description: input.description?.toLowerCase(),
        supplierId: input.supplierId,
      }
      for (let i = 0; i < Object.keys(newProduct).length; i++) {
        const indexObj: string = Object.keys(newProduct)[i]
        if (newProduct[indexObj]) {
          obj[indexObj] = newProduct[indexObj]
        }
      }
      console.log(
        'memory usage :',
        process.memoryUsage().heapUsed / 1024 / 1024,
        'MB'
      )
      return ctx.prisma.product.update({
        data: obj,
        where: {
          id: input.id,
        },
      })
    }),
  deleteProduct: publicProcedure
    .input(z.object({ material: z.string() }))
    .mutation(({ input, ctx }) => {
      console.log(
        'memory usage :',
        process.memoryUsage().heapUsed / 1024 / 1024,
        'MB'
      )
      return ctx.prisma.product.deleteMany({
        where: {
          material: input.material,
        },
      })
    }),
})
