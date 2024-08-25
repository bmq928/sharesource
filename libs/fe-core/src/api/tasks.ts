'use client'

import type {
  CreateTaskDto,
  IdDto,
  PaginatedQueryDto,
  TaskPaginatedResponse,
  TaskResponse,
  UpdateTaskDto,
} from '@libs/be-core'
// must be this path
// @reduxjs/toolkit or @reduxjs/toolkit/query not working
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse } from './utils'

export const tasksApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['NEXT_PUBLIC_API_PATH'],
    credentials: 'same-origin',
  }),
  endpoints: (builder) => ({
    listTasks: builder.query<TaskPaginatedResponse, Partial<PaginatedQueryDto>>(
      {
        query: (query) => ({
          url: '/v1/tasks',
          method: 'GET',
          params: query,
        }),
        providesTags: ['tasks'],
        transformErrorResponse,
      }
    ),

    createTask: builder.mutation<TaskResponse, CreateTaskDto>({
      query: (body) => ({
        url: '/v1/tasks',
        method: 'POST',
        body,
      }),
      transformErrorResponse,
      invalidatesTags: ['tasks'],
    }),

    updateTask: builder.mutation<TaskResponse, UpdateTaskDto & IdDto>({
      query: ({ id, ...body }) => ({
        url: `/v1/tasks/${id}`,
        method: 'PUT',
        body,
      }),
      transformErrorResponse,
      invalidatesTags: ['tasks'],
    }),

    deleteTask: builder.mutation<unknown, IdDto>({
      query: ({ id }) => ({
        url: `/v1/tasks/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse,
      invalidatesTags: ['tasks'],
    }),
  }),
})

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useListTasksQuery,
  useUpdateTaskMutation,
} = tasksApi
