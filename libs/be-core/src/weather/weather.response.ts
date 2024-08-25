import { Expose } from 'class-transformer'

export class WeatherResponse {
  @Expose()
  temp: number

  @Expose()
  unit: string
}
