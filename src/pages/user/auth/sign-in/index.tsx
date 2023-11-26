import { useForm } from 'react-hook-form'
import {
  TextField,
  Snackbar,
  Button,
  Alert
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  signIn,
  useSession
} from 'next-auth/react'
import {
  SyntheticEvent,
  useState,
  useEffect
} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SignIn() {
  const router = useRouter()
  const { status } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    // clearErrors,
    // setValue,
  } = useForm()
  const [open, setOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    } else {
      setIsSubmitting(false)
    }
  }, [status])

  function openSnackbar(): void {
    setOpen(true)
  }

  const closeSnackbar = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  function onSubmit(data: any): void {
    setIsSubmitting(true)
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })
      .then(({ ok, error }: any) => {
        if (!ok && error) {
          setSnackbarMessage('Usuario o contraseña incorrectos.')
          openSnackbar()
          setIsSubmitting(false)
        } else {
          router.replace('/')
        }
      })
  }

  if (status !== 'unauthenticated') return <p>Cargando...</p>

  return <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
      id='email'
      type='email'
      label='Correo electrónico'
      {...(register && register(
        'email',
        {
          required: 'Campo requerido',
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Correo electrónico inválido.'
          }
        }
      ))}
      error={!!errors.email}
      helperText={<>{errors.email && errors.email.message}</>}
      fullWidth
    />
    <TextField
      id='password'
      type='password'
      label='Contraseña'
      {...(register && register(
        'password',
        {
          required: 'Campo requerido',
          pattern: /^(?=.*[!-~])(?=.{8,64})/
        }
      ))}
      error={!!errors.password}
      helperText={<>{errors.password && errors.password.message}</>}
      fullWidth
    />
    <LoadingButton
      type='submit'
      variant='contained'
      color='primary'
      disabled={isSubmitting}
      loading={isSubmitting}
      className={isSubmitting ? `cursor-progress` : ``}
    >Iniciar Sesión</LoadingButton>
    <Link href='/user/auth/sign-up'>
      → Si no posee cuenta, regístrese aquí ←
    </Link>
    <p>También puede iniciar sesión con google</p>
    <Button
      type='button'
      variant='contained'
      color='primary'
      onClick={() => signIn(
        'google',
        {
          callbackUrl: '/',
          redirect: true
        }
      )}
    >Google</Button>
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      message={snackbarMessage}
    >
      <Alert onClose={closeSnackbar} severity='error' sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </form>
}