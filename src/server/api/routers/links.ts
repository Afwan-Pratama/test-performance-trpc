import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const linksRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.link.findMany()
  }),
})
