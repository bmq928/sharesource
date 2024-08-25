'use client'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tasksApi, usersApi, weathersApi } from './api'

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [weathersApi.reducerPath]: weathersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tasksApi.middleware)
      .concat(usersApi.middleware)
      .concat(weathersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)
