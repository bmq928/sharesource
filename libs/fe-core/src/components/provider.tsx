'use client'

import { ThemeProvider } from '@mui/material/styles'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store'
import { theme } from '../theme'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  )
}
