import { registerAs } from '@nestjs/config'
import * as joi from 'joi'

export interface Pbkdf2Config {
  pbkdf2Salt: string
  pbkdf2Iterations: number
  pbkdf2KeyLens: number
  pbkdf2Digest: string
}

export const PBKDF2_CONFIG_TOKEN = 'pbkdf2'

export const pbkdf2Config = registerAs(
  PBKDF2_CONFIG_TOKEN,
  (): Pbkdf2Config => ({
    pbkdf2Salt: process.env['PBKDF2_SALT'] as string,
    pbkdf2Iterations: parseInt(process.env['PBKDF2_ITERATION'] as string),
    pbkdf2KeyLens: parseInt(process.env['PBKDF2_KEY_LENS'] as string),
    pbkdf2Digest: process.env['PBKDF2_DIGEST'] as string,
  })
)

export const pbkdf2ConfigSchema = joi.object({
  PBKDF2_SALT: joi.string().required(),
  PBKDF2_ITERATION: joi.number().default(100000),
  PBKDF2_KEY_LENS: joi.number().default(64),
  PBKDF2_DIGEST: joi.string().default('sha512'),
})
