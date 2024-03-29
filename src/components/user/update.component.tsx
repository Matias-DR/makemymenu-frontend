'use client'

import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import {
  SyntheticEvent,
  useState
} from 'react'
import {
  TextInputComponent,
  type
} from 'components/inputs'
import {
  useSession
} from 'next-auth/react'
import { useForm } from 'react-hook-form'
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN
} from 'lib/constants'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import {
  Alert,
  Snackbar
} from '@mui/material'
import {
  JwtPayload,
  decode
} from 'jsonwebtoken'
import { css } from 'lib/constants'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export default function UserUpdateComponent() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { data: session, update } = useSession()

  let email
  if (session!.provider === 'credentials') {
    email = (decode(session?.user.accessToken as string) as JwtPayload).email
  } else {
    email = session!.user.email
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch
    // clearErrors,
    // setValue,
  } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [status, setStatus] = useState('success' as 'success' | 'error' | 'warning' | 'info' | 'success' | undefined)

  function openSnackbar(): void {
    setSnackbarOpen(true)
  }

  function closeSnackbar(event: SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  function onSubmit(data: any): void {
    setIsSubmitting(true)
    axios.patch('/api/user/update', {
      newEmail: data.newEmail,
      newPassword: data.newPassword,
      newPasswordConfirmation: data.newPasswordConfirmation,
      password: data.password
    }, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken as string}`
      }
    })
      .then(async (res: any) => {
        session!.user.accessToken = res.data.accessToken
        session!.user.refreshToken = res.data.refreshToken
        await update({
          ...session,
          user: {
            ...session!.user,
            accessToken: res.data.accessToken
          }
        })
        setStatus('success')
        setSnackbarMessage('Datos actualizados correctamente')
        openSnackbar()
        setIsSubmitting(false)
      })
      .catch((error: any) => {
        setStatus('error')
        if (error && error.response && error.response.data) {
          setSnackbarMessage(error.response.data || 'Error al actualizar los datos.')
          openSnackbar()
        }
        setIsSubmitting(false)
      })
  }

  return <div>
    <Button
      type='button'
      color='primary'
      onClick={handleOpen}
    >Modificar usuario</Button>
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <Box sx={{
            ...style,
            display: 'flex',
            flexDirection: 'column',
            placeContent: 'space-evenly',
            alignItems: 'center',
            paddingTop: '.5rem',
          }}>
            <h3 style={{
              margin: '0',
              fontSize: '2rem',
            }} >ACTUALIZACIÓN</h3>
            <div style={{
              ...css.blackTransparent,
              display: 'flex',
              flexDirection: 'column',
              placeContent: 'space-evenly',
              alignItems: 'center',
            }}>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  placeContent: 'space-evenly',
                  alignItems: 'center',
                  paddingTop: '.4rem',
                }}>
                <fieldset style={{ borderStyle: 'none' }}>
                  <TextInputComponent
                    id='newEmail'
                    type={type.EMAIL}
                    label='Nuevo email'
                    register={register}
                    required={false}
                    error={errors.newEmail}
                    pattern={{ value: EMAIL_PATTERN, message: 'Email inválido' }}
                    trigger={trigger}
                    sx={{ marginBottom: '.7rem' }}
                  />
                  <TextInputComponent
                    id='newPassword'
                    type={type.PASSWORD}
                    label='Nueva contraseña'
                    register={register}
                    required={false}
                    error={errors.newPassword}
                    pattern={{ value: PASSWORD_PATTERN, message: 'Contraseña inválida' }}
                    trigger={trigger}
                    sx={{ marginBottom: '.7rem' }}
                  />
                  <TextInputComponent
                    id='newPasswordConfirmation'
                    type={type.PASSWORD}
                    label='Confirmación de nueva contraseña'
                    register={register}
                    required={watch('newPassword') !== undefined && watch('newPassword') !== ''}
                    error={errors.newPasswordConfirmation}
                    validate={(value: string) => value === watch('newPassword')
                      || 'Las contraseñas no coinciden'}
                    pattern={{ value: PASSWORD_PATTERN, message: 'Confirmación de contraseña inválida' }}
                    trigger={trigger}
                    sx={{ marginBottom: '.7rem' }}
                  />
                  <TextInputComponent
                    id='password'
                    type={type.PASSWORD}
                    label='Contraseña actual'
                    register={register}
                    required={
                      watch('newPassword') !== '' && watch('newPassword') !== undefined && watch('newPassword') !== null
                        || watch('newEmail') !== '' && watch('newEmail') !== undefined && watch('newEmail') !== null
                        || watch('newPasswordConfirmation') !== '' && watch('newPasswordConfirmation') !== undefined && watch('newPasswordConfirmation') !== null ? 'Ingrese la contraseña actual' : false
                    }
                    error={errors.password}
                    pattern={{ value: PASSWORD_PATTERN, message: 'Contraseña inválida' }}
                    trigger={trigger}
                  />
                </fieldset>
                <div style={{
                  paddingBottom: '.8rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                  <LoadingButton
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className={isSubmitting ? `cursor-progress` : ``}
                    sx={{ marginRight: '1rem' }}
                  >Actualizar</LoadingButton>
                  <Button variant='contained' onClick={handleClose}>Volver</Button>
                </div>
              </form>
            </div>
          </Box>
        </div>
      </Fade>
    </Modal>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      message={snackbarMessage}
      sx={{ display: 'absolute' }}
    >
      <Alert onClose={closeSnackbar} severity={status} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </div>
}