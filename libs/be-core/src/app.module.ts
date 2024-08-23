import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as joi from 'joi'
import { DataSourceOptions } from 'typeorm'
import {
  baseConfig,
  baseConfigSchema,
  JWT_CONFIG_TOKEN,
  JwtConfig,
  jwtConfig,
  jwtConfigSchema,
  pbkdf2Config,
  pbkdf2ConfigSchema,
  TYPEORM_CONFIG_TOKEN,
  typeormConfig,
  typeormConfigSchema,
} from './config'
import { TasksModule } from './tasks'
import { UsersModule } from './users'

export class AppModule {
  static register({
    migrations,
    entities,
  }: Pick<DataSourceOptions, 'migrations' | 'entities'>): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [baseConfig, typeormConfig, jwtConfig, pbkdf2Config],
          validationSchema: joi
            .object()
            .concat(baseConfigSchema)
            .concat(typeormConfigSchema)
            .concat(jwtConfigSchema)
            .concat(pbkdf2ConfigSchema),
        }),
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            ...configService.get<DataSourceOptions>(TYPEORM_CONFIG_TOKEN),
            migrations,
            entities,
          }),
          inject: [ConfigService],
        }),
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<JwtConfig>(JWT_CONFIG_TOKEN)?.secret,
            expiresIn:
              configService.get<JwtConfig>(JWT_CONFIG_TOKEN)?.accessTokenExpire,
          }),
          inject: [ConfigService],
          global: true,
        }),
        UsersModule,
        TasksModule,
      ],
    }
  }
}
