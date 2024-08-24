'use client'
import type {
  LoginDto,
  RegisterDto,
  UserAuthTokenResponse,
  UserResponse,
} from '@libs/be-core'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['API_PATH'],
    credentials: 'same-origin',
  }),
  endpoints: (builder) => ({
    getMe: builder.query<UserResponse, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
    }),

    login: builder.mutation<LoginDto, UserAuthTokenResponse>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),

    register: builder.mutation<RegisterDto, UserAuthTokenResponse>({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
    }),
  }),
})
