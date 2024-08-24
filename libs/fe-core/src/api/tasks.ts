'use client'
import type {
  CreateTaskDto,
  IdDto,
  PaginatedQueryDto,
  TaskPaginatedResponse,
  TaskResponse,
  UpdateTaskDto,
} from '@libs/be-core'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tasksApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['API_PATH'],
    credentials: 'same-origin',
  }),
  endpoints: (builder) => ({
    list: builder.query<TaskPaginatedResponse, PaginatedQueryDto>({
      query: (query) => ({
        url: '/tasks',
        method: 'GET',
        params: query,
      }),
    }),

    create: builder.mutation<TaskResponse, CreateTaskDto>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
    }),

    update: builder.mutation<TaskResponse, UpdateTaskDto & IdDto>({
      query: ({ id, ...body }) => ({
        url: '/tasks',
        method: 'PUT',
        body,
      }),
    }),

    delete: builder.mutation<unknown, IdDto>({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})
