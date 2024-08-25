'use client'

import LogoutIcon from '@mui/icons-material/Logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useGetMeQuery, useLogoutMutation } from '../api'

import { redirect } from 'next/navigation'

export function Nav() {
  const { data, isError } = useGetMeQuery()
  const [doLogout] = useLogoutMutation()

  if (isError) return redirect('/login')

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Sharesource
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ alignContent: 'center' }}>{data?.email}</Box>
            <IconButton size="large" color="inherit" onClick={() => doLogout()}>
              <LogoutIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}></Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
