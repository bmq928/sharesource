import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { AxiosError } from 'axios'

@Catch(AxiosError)
export class WeatherExceptionFilter extends BaseExceptionFilter {
  override catch(exception: AxiosError, host: ArgumentsHost): void {
    const resp = exception.response?.data as Record<string, string>
    const msg = resp?.['msg'] ?? resp?.['message'] ?? exception.message

    return super.catch(
      {
        statusCode: exception.response?.status,
        message: `Weather API: ${msg}`,
      },
      host
    )
  }
}
