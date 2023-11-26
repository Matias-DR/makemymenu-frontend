import { useForm } from 'react-hook-form'
import {
  TextField,
  Snackbar,
  Alert
} from '@mui/material'
import axios from 'axios'
import {
  SyntheticEvent,
  useEffect,
  useState
} from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'

export default function SignUp() {
  const router = useRouter()
  const { status } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
  }, [status, watch('password')])

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
    axios.post('/api/user/auth/sign-up', {
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation
    })
      .then(() => {
        router.replace('/')
      })
      .catch((error: any) => {
        if (error && error.response && error.response.data) {
          setSnackbarMessage('Error al intentar registrarse.')
          openSnackbar()
        }
        setIsSubmitting(false)
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
          pattern: {
            value: /^(?=.*[!-~])(?=.{8,64})/,
            message: 'Contraseña inválida. Debe contener entre 8 a 64 caracteres.'
          }
        }
      ))}
      error={!!errors.password}
      helperText={<>{errors.password && errors.password.message}</>}
      fullWidth
    />
    <TextField
      id='passwordConfirmation'
      type='password'
      label='Confirmación de contraseña'
      {...(register && register(
        'passwordConfirmation',
        {
          required: 'Campo requerido',
          validate: (value: string) => value === watch('password')
            || 'Las contraseñas no coinciden'
        }
      ))}
      error={!!errors.passwordConfirmation}
      helperText={<>{errors.passwordConfirmation && errors.passwordConfirmation.message}</>}
      fullWidth
    />
    <LoadingButton
      type='submit'
      variant='contained'
      color='primary'
      loading={isSubmitting}
    >Registrarse</LoadingButton>
    <Link href='/user/auth/sign-in'>
      → Si posee cuenta, inicie sesión aquí ←
    </Link>
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