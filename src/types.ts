import { PrismaClientInput, PrismaSchemaConfig } from 'nexus-prisma/dist/types'
import Express from 'express'
import { Server as HttpServer } from 'http'
import {
  IMiddlewareWithOptions,
  IMiddlewareResolver,
} from 'graphql-middleware/dist/types'
import { IMiddlewareTypeMap, IMiddlewareGenerator } from 'graphql-middleware'

export type MaybePromise<T> = Promise<T> | T

export type DatamodelInfo = PrismaSchemaConfig['prisma']['datamodelInfo']

export type InputPrismaConfig = {
  /**
   * The default exported object generated by `nexus-prisma-generate`
   *
   * Import it from the output directory generated by `nexus-prisma-generate`
   */
  datamodelInfoPath?: string
  /**
   * Instance of the prisma-client, either passed statically
   * or returned from the context defined in your GraphQL server
   *
   * @default ./.yoga/prisma-client/index.ts
   */
  client?: PrismaClientInput
}

export type InputOutputFilesConfig = {
  /**
   * Path to the generated typings
   * @default ./.yoga/nexus.ts
   */
  typegenPath?: string
  /**
   * Path to the generated schema
   * @default ./src/schema.graphql
   */
  schemaPath?: string
}

export type InputConfig = {
  /**
   * Path to the resolvers directory.
   * **Path has to exist**
   * @default ./src/graphql/
   */
  resolversPath?: string
  /**
   * Path to the `context.ts` file to inject a context into your graphql resolvers. **If provided, path has to exist**
   * @default ./src/context.ts
   */
  contextPath?: string
  /**
   * Path to the `types.ts` file to override nexus default types **If provided, path has to exist**
   * @default ./src/types.ts
   */
  typesPath?: string
  /**
   * Path to the `server.ts` file to eject from default configuration file `yoga.config.ts`.
   * When provided, all other configuration properties are ignored and should be configured programatically.
   * **If provided, path has to exist**
   * @default ./src/server.ts
   */
  ejectedFilePath?: string
  /**
   * Path to the `express.ts` file.
   * This file gets injected the underlying express instance (to add routes, or middlewares etc...)
   * **If provided, path has to exist**
   * @default ./src/express.ts
   */
  expressPath?: string
  /**
   * Path to the `graphqlMiddleware.ts` file.
   * This file returns graphql middleware to inject into the schema .
   * **If provided, path has to exist**
   * @default ./src/graphqlMiddleware.ts
   */
  graphqlMiddlewarePath?: string
  /**
   * Config for the outputted files (schema, typings ..)
   */
  output?: InputOutputFilesConfig
  /**
   * Config for the prisma integration
   */
  prisma?: InputPrismaConfig
}

type RequiredProperty<T extends keyof InputConfig> = Exclude<
  InputConfig[T],
  undefined
>
export type GraphqlMiddleware = (
  | IMiddlewareGenerator<any, any, any>
  | IMiddlewareWithOptions<any, any, any>
  | IMiddlewareResolver<any, any, any>
  | IMiddlewareTypeMap<any, any, any>)[]

export type Config = {
  resolversPath: RequiredProperty<'resolversPath'>
  contextPath?: RequiredProperty<'contextPath'>
  ejectedFilePath?: RequiredProperty<'ejectedFilePath'>
  typesPath?: RequiredProperty<'typesPath'>
  output: RequiredProperty<'output'>
  prisma?: PrismaSchemaConfig['prisma']
  expressPath?: RequiredProperty<'expressPath'>
  graphqlMiddlewarePath?: RequiredProperty<'graphqlMiddlewarePath'>
}
export type DefaultConfig = {
  resolversPath: string
  contextPath: string
  ejectedFilePath: string
  typesPath: string
  output: {
    typegenPath: string
    schemaPath: string
  }
  prisma: PrismaSchemaConfig['prisma']
  expressPath: RequiredProperty<'expressPath'>
  graphqlMiddlewarePath: RequiredProperty<'graphqlMiddlewarePath'>
}

export type ConfigWithInfo = {
  yogaConfigPath?: string
  yogaConfig: Config
  projectDir: string
  inputConfig: InputConfig
  datamodelInfoDir?: string
  prismaClientDir?: string
}

export interface Yoga<T = Express.Application, U = HttpServer> {
  server: () => MaybePromise<T>
  startServer: (params: T) => MaybePromise<U>
  stopServer: (params: U) => any
}
