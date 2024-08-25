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
import { tasksApi, TaskTagTypes } from './tasks'
import { transformErrorResponse } from './utils'

export enum UsersTagTypes {
  Me = 'user.me',
}
export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: [UsersTagTypes.Me],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['NEXT_PUBLIC_API_PATH'],
    credentials: 'same-origin',
  }),
  endpoints: (builder) => ({
    getMe: builder.query<UserResponse, void>({
      query: () => ({
        url: '/v1/users/me',
        method: 'GET',
      }),
      transformErrorResponse,
      providesTags: [UsersTagTypes.Me],
    }),

    login: builder.mutation<UserAuthTokenResponse, LoginDto>({
      query: (body) => ({
        url: '/v1/users/login',
        method: 'POST',
        body,
      }),
      transformErrorResponse,
      invalidatesTags: [UsersTagTypes.Me],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled
        dispatch(tasksApi.util.invalidateTags([TaskTagTypes.Task]))
      },
    }),

    register: builder.mutation<UserAuthTokenResponse, RegisterDto>({
      query: (body) => ({
        url: '/v1/users/register',
        method: 'POST',
        body,
      }),
      transformErrorResponse,
      invalidatesTags: [UsersTagTypes.Me],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled
        dispatch(tasksApi.util.invalidateTags([TaskTagTypes.Task]))
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/v1/users/logout',
        method: 'PUT',
      }),
      transformErrorResponse,
      invalidatesTags: [UsersTagTypes.Me],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled
        dispatch(tasksApi.util.invalidateTags([TaskTagTypes.Task]))
      },
    }),
  }),
})

export const {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = usersApi
