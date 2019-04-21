import * as path from 'path'
import {
  ApolloServer,
  makePrismaSchema,
  express,
  yogaEject,
  middleware,
} from '@atto-byte/yoga'
import * as types from './graphql'
import context from './context'

import graphqlMiddleware from './graphqlMiddleware'
import datamodelInfo from './generated/nexus-prisma'
import { prisma } from './generated/prisma-client'

export default yogaEject({
  async server() {
    let schema = makePrismaSchema({
      types,
      prisma: {
        datamodelInfo,
        client: prisma,
      },
      outputs: {
        schema: path.join(__dirname, './generated/schema.graphql'),
        typegen: path.join(__dirname, './generated/nexus.ts'),
      },
      nonNullDefaults: {
        input: true,
        output: true,
      },
      typegenAutoConfig: {
        sources: [
          {
            source: path.join(__dirname, './context.ts'),
            alias: 'ctx',
          },
          {
            source: path.join(__dirname, './generated/prisma-client/index.ts'),
            alias: 'prisma',
          },
          ,
        ],
        contextType: 'ctx.Context',
      },
    })
    schema = middleware.applyMiddleware(schema, ...graphqlMiddleware)

    const apolloServer = new ApolloServer.ApolloServer({
      schema,
      context,
    })
    const app = express()

    apolloServer.applyMiddleware({ app, path: '/' })

    return app
  },
  async startServer(app) {
    return app.listen({ port: 4000 }, () => {
      console.log(`🚀  Server ready at http://localhost:4000/`)
    })
  },
  async stopServer(http) {
    http.close()
  },
})
