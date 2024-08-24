'use client'
import type {
  LoginDto,
  RegisterDto,
  UserAuthTokenResponse,
  UserResponse,
} from '@libs/be-core'
// must be this path
// @reduxjs/toolkit or @reduxjs/toolkit/query not working
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse } from './utils'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['users', 'me'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['NEXT_PUBLIC_API_PATH'],
    credentials: 'same-origin',
  }),
  endpoints: (builder) => ({
    getMe: builder.query<void, UserResponse>({
      query: () => ({
        url: '/v1/users/me',
        method: 'GET',
      }),
      transformErrorResponse,
      providesTags: ['me'],
    }),

    login: builder.mutation<UserAuthTokenResponse, LoginDto>({
      query: (body) => ({
        url: '/v1/users/login',
        method: 'POST',
        body,
      }),
      transformErrorResponse,
      invalidatesTags: ['me'],
    }),

    register: builder.mutation<UserAuthTokenResponse, RegisterDto>({
      query: (body) => ({
        url: '/v1/users/register',
        method: 'POST',
        body,
      }),
      transformErrorResponse,
      invalidatesTags: ['me'],
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation, useRegisterMutation } = usersApi
