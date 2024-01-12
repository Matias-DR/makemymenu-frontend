import { useForm } from 'react-hook-form'
import {
  Snackbar,
  Alert,
  Button
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
import styles from './styles.module.css'
import {
  TextInputComponent,
  type
} from 'components/inputs'
import { EMAIL_PATTERN, PASSWORD_PATTERN, css } from 'lib/constants'

export default function SignUp() {
  const router = useRouter()
  const { status } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
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

  function closeSnackbar(event: SyntheticEvent | Event, reason?: string) {
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
          setSnackbarMessage(error.response.data || 'Error al intentar registrarse.')
          openSnackbar()
        }
        setIsSubmitting(false)
      })
  }

  function poster() {
    const letter = (firstLetter: string, secondLetter: string) => <div className='bg-transparent w-32 h-20'>
      <div className={styles.panelInner}>
        <div className='absolute w-full h-full [backface-visibility:hidden] bg-[tomato] text-[black]'>
          <p>{firstLetter}</p>
        </div>
        <div className='absolute w-full h-full [backface-visibility:hidden] bg-[teal] text-[white] [transform:rotateY(180deg)]'>
          <p>{secondLetter}</p>
        </div>
      </div>
    </div>
    const posters = [
      ['M', 'a', 'k', 'e', 'M', 'y', 'M', 'e', 'n', 'u'],
      ['M', 'i', 's', 'R', 'e', 'c', 'e', 't', 'a', 's'],
    ]
    return <div className='box-border font-["Share",_sans-serif] italic text-[3em] my-6'>
      <div className='m-auto w-[1000px] flex justify-center flex-nowrap mt-[15vh]'>
        {posters[0].map((_, index) => letter(posters[0][index], posters[1][index]))}
      </div>
    </div>
  }

  if (status !== 'unauthenticated') return <p>Cargando...</p>

  return <main className='w-full h-full flex justify-around items-center flex-col'>

    {/* {poster()} */}

    <div className='w-11/12 max-w-screen-sm flex justify-center items-center flex-col py-3'>
      <h2 className='mb-2 text-4xl'>REGISTRO</h2>
      <form
        className='flex justify-center items-center flex-col divide-slate-400 rounded-md border-solid border-2 border-red-500 pb-3'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={css.blackTransparent}
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
            className='mb-5'
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
            className='mb-5'
          />
          <TextInputComponent
            id='passwordConfirmation'
            type={type.PASSWORD}
            label='Confirmación de contraseña'
            register={register}
            required='Campo requerido'
            error={errors.passwordConfirmation}
            validate={(value: string) => value === watch('password')
              || 'Las contraseñas no coinciden'}
            trigger={trigger}
          />
        </fieldset>
        <LoadingButton
          type='submit'
          variant='contained'
          color='primary'
          loading={isSubmitting}
          className='mt-3'
        >Registrarse</LoadingButton>
        <Link href='/user/auth/sign-in' className='mt-3'>
          <Button>→ Inicie sesión aquí ←</Button>
        </Link>
      </form>
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
  </main>
}