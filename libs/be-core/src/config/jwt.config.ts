import { registerAs } from '@nestjs/config'
import * as joi from 'joi'

export const JWT_CONFIG_TOKEN = 'jwt'

export type JwtConfig = {
  secret: string
  refreshTokenExpire: string
  accessTokenExpire: string
}

export const jwtConfig = registerAs(
  JWT_CONFIG_TOKEN,
  (): JwtConfig => ({
    secret: process.env['JWT_SECRET'] as string,
    refreshTokenExpire: process.env['JWT_REFRESH_TOKEN_EXPIRES_IN'] as string,
    accessTokenExpire: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] as string,
  })
)

export const jwtConfigSchema = joi.object({
  JWT_SECRET: joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: joi.string().required(),
})
