import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WEATHER_CONFIG_TOKEN, WeatherConfig } from '../config'
import { WeatherController } from './weather.controller'
import { WeatherService } from './weather.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<WeatherConfig>(WEATHER_CONFIG_TOKEN)?.apiUrl,
        timeout:
          configService.get<WeatherConfig>(WEATHER_CONFIG_TOKEN)?.apiTimeout,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
