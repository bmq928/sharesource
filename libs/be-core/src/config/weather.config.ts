import { registerAs } from '@nestjs/config'
import * as joi from 'joi'

export interface WeatherConfig {
  apiUrl: string
  apiTimeout: number
  lat: number
  lon: number
}

export const WEATHER_CONFIG_TOKEN = 'weather'

export const weatherConfig = registerAs(
  WEATHER_CONFIG_TOKEN,
  (): WeatherConfig => ({
    apiUrl: process.env['WEATHER_API_URL'] ?? 'https://api.open-meteo.com',
    apiTimeout: parseInt(process.env['WEATHER_API_TIMEOUT'] ?? '30000'),
    lat: parseFloat(process.env['WEATHER_LAT'] ?? '21.028511'),
    lon: parseFloat(process.env['WEATHER_LON'] ?? '105.804817'),
  })
)

export const weatherConfigSchema = joi.object({
  WEATHER_API_URL: joi.string().uri().default('https://api.open-meteo.com'),
  WEATHER_API_TIMEOUT: joi.number().default('30000'),
  WEATHER_LAT: joi.number().default('21.028511'),
  WEATHER_LON: joi.number().default('105.804817'),
})
