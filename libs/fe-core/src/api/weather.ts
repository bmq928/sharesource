'use client'

// must be this path
// @reduxjs/toolkit or @reduxjs/toolkit/query not working
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { WeatherResponse } from '@libs/be-core'
import { transformErrorResponse } from './utils'

export enum WeatherTagTypes {
  Weather = 'weather',
}
export const weathersApi = createApi({
  reducerPath: 'weatherApi',
  tagTypes: [WeatherTagTypes.Weather],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['NEXT_PUBLIC_API_PATH'],
    credentials: 'same-origin',
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, void>({
      query: () => ({
        url: '/v1/weather',
        method: 'GET',
      }),
      providesTags: [WeatherTagTypes.Weather],
      transformErrorResponse,
    }),
  }),
})

export const { useGetWeatherQuery } = weathersApi
