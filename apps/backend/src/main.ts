import type {} from 'tslib' // nx generatePackageJson missing this lib

import fastifyCookie from '@fastify/cookie'
import { AppModule, baseConfig } from '@libs/be-core'
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import morgan from 'morgan'
import { DataSource } from 'typeorm'
import { entities, migrations } from './ormconfig'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule.register({ entities, migrations }),
    new FastifyAdapter()
  )
  const {
    host,
    port,
    version,
    basePath,
    cookieSecret,
    swaggerPath,
  }: ConfigType<typeof baseConfig> = app.get(baseConfig.KEY)
  const ds = app.get(DataSource)
  await ds.runMigrations()

  app.setGlobalPrefix(basePath)
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  app.register(fastifyCookie, { secret: cookieSecret })
  app.use(
    morgan('tiny', { stream: { write: (str: string) => Logger.verbose(str) } })
  )

  const documentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Backend')
    .setDescription('The API description')
    .setVersion(version)
  SwaggerModule.setup(
    swaggerPath,
    app,
    SwaggerModule.createDocument(app, documentBuilder.build())
  )
  await app.listen(port, host)
  Logger.log(
    `app v${version} is running on: http://localhost:${port}${basePath}`
  )
  Logger.log(
    `swagger v${version} is running on: http://localhost:${port}${swaggerPath}`
  )
}

bootstrap()
