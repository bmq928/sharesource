import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '../common'
import { WeatherExceptionFilter } from './weather-exception.filter'
import { WeatherResponse } from './weather.response'
import { WeatherService } from './weather.service'

@UseGuards(AuthGuard)
@UseFilters(WeatherExceptionFilter)
@ApiBearerAuth()
@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  get(): Promise<WeatherResponse> {
    return this.weatherService.getCurrentTemp().then((data) => ({
      temp: data.current.temperature_2m,
      unit: data.current_units.temperature_2m,
    }))
  }
}
