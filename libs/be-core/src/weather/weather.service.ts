import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import { weatherConfig } from '../config'
import { GetWeatherResponse } from './weather.type'

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(weatherConfig.KEY)
    private readonly env: ConfigType<typeof weatherConfig>
  ) {}

  async getCurrentTemp(): Promise<GetWeatherResponse> {
    return firstValueFrom(
      this.httpService.get('/v1/forecast', {
        params: {
          latitude: this.env.lat,
          longitude: this.env.lon,
          current: 'temperature_2m',
        },
      })
    ).then(({ data }) => data)
  }
}
