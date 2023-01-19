import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import superjson from 'superjson'

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const prisma = new PrismaClient()
  return {
    req,
    res,
    prisma,
  }
}
type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

const router = t.router
const publicProcedure = t.procedure

// root router to call
const appRouter = router({
  // merge predefined routers
  links: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.link.findMany()
  }),
})

export type AppRouter = typeof appRouter

async function main() {
  // express implementation
  const app = express()

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )
  app.listen(4000, () => {
    console.log('listening on port 4000')
  })
}

main()
