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
import { TextInputComponent, type } from 'components/inputs'
import { EMAIL_PATTERN, PASSWORD_PATTERN } from 'lib/constants'

export default function SignIn() {
  const router = useRouter()
  const { status } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
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

  const openSnackbar = () => {
    setOpen(true)
  }

  const closeSnackbar = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const onSubmit = (data: any) => {
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

  return <main className='w-full h-full flex justify-around items-center flex-col'>
    <div className='w-11/12 max-w-screen-sm flex justify-center items-center flex-col'>
      <h2 className='mb-2' >INICIO DE SESIÓN</h2>
      <form
        className='flex justify-center items-center flex-col divide-slate-400 bg-orange-300 rounded-md bg-opacity-25 border-solid border-2 border-red-500 pb-3'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset className='border-none'>
          <TextInputComponent
            id='email'
            type={type.EMAIL}
            label='Correo electrónico'
            register={register}
            required='Campo requerido'
            error={errors.email}
            pattern={{
              value: EMAIL_PATTERN,
              message: 'Correo electrónico inválido.'
            }}
            validate={() => true}
            trigger={trigger}
          />
          <TextInputComponent
            id='password'
            type={type.PASSWORD}
            label='Contraseña'
            register={register}
            required='Campo requerido'
            error={errors.password}
            pattern={{
              value: PASSWORD_PATTERN,
              message: 'Contraseña inválida. Debe contener entre 8 a 64 caracteres.'
            }}
            trigger={trigger}
          />
        </fieldset>
        <LoadingButton
          type='submit'
          variant='contained'
          color='primary'
          disabled={isSubmitting}
          loading={isSubmitting}
          className={isSubmitting ? `cursor-progress` : ``}
        >Iniciar Sesión</LoadingButton>
        <Link
          className='mt-3'
          href='/user/auth/sign-up'
        >
          → Regístrese aquí ←
        </Link>
      </form>
        <fieldset className='flex justify-center items-center flex-col divide-slate-400 bg-orange-300 rounded-md bg-opacity-25 border-solid border-2 border-red-500 mt-3'>
          <legend><h4 className='m-0'>O puede ingresar con</h4></legend>
          <Button
            className='mt-3'
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
        </fieldset>
    </div>
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
  </main >
}