'use client'

import type { RegisterDto } from '@libs/be-core'
import { useGetMeQuery, useRegisterMutation } from '@libs/fe-core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function Page() {
  const { isSuccess: isLoggedIn } = useGetMeQuery()
  const [
    doRegister,
    { isLoading, isError: isRegisterError, error: registerErr },
  ] = useRegisterMutation()
  const {
    handleSubmit,
    control,
    formState: { errors: formErr },
  } = useForm<RegisterDto>()
  const [isToastErr, setIsToastErr] = useState(false)

  useEffect(() => {
    isRegisterError && setIsToastErr(true)
  }, [registerErr, isRegisterError])

  if (isLoggedIn) return redirect('/home')

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={isToastErr}
        autoHideDuration={3000}
        onClose={() => setIsToastErr(false)}
      >
        <Alert
          onClose={() => setIsToastErr(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {registerErr as string}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(doRegister)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="email"
            defaultValue=""
            rules={{ required: 'Email is required' }}
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!formErr.email?.message}
                helperText={formErr.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            defaultValue=""
            rules={{ required: 'Password is required' }}
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                error={!!formErr.password?.message}
                helperText={formErr.password?.message}
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login">Already have an account? Log In</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
