import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { SyntheticEvent, useState } from 'react'
import { TextInputComponent, type } from 'components/inputs'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN
} from 'lib/constants'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import { Alert, Snackbar } from '@mui/material'
import { JwtPayload, decode } from 'jsonwebtoken'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function UserUpdateComponent() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { data: session } = useSession()
  const { email } = decode(session?.user.accessToken as string) as JwtPayload
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
  const [status, setStatus] = useState('' as 'success' | 'error' | 'warning' | 'info' | 'success' | undefined)

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
    // SE VE QUE HAY QUE ACTUALIZAR EL TOKEN QUE DESDE BACKEND SE ENVÍA ACTUALIZADO SEGÚN LOS DATOS QUE SE ACTUALIZARON
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
      .then(() => {
        setStatus('success')
        setSnackbarMessage('Datos actualizados correctamente')
        openSnackbar()
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

  return (
    <div>
      <Button
        type='button'
        variant='contained'
        color='primary'
        onClick={handleOpen}
      >{ email }</Button>
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
          <Box sx={style}>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset>
                <TextInputComponent
                  id='newEmail'
                  type={type.EMAIL}
                  label='Nuevo email'
                  register={register}
                  required={false}
                  error={errors.newEmail}
                  pattern={{ value: EMAIL_PATTERN, message: 'Email inválido' }}
                  trigger={trigger}
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
                />
                <TextInputComponent
                  id='password'
                  type={type.PASSWORD}
                  label='Contraseña actual'
                  register={register}
                  required={
                    watch('newPassword') !== '' && watch('newPassword') !== undefined && watch('newPassword') !== null
                    || watch('newEmail') !== '' && watch('newEmail') !== undefined && watch('newEmail') !== null
                    || watch('newPasswordConfirmation') !== '' && watch('newPasswordConfirmation') !== undefined && watch('newPasswordConfirmation') !== null
                  }
                  error={errors.password}
                  pattern={{ value: PASSWORD_PATTERN, message: 'Contraseña inválida' }}
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
            </form>
            <Button onClick={handleClose}>Volver</Button>
          </Box>
        </Fade>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      >
        <Alert onClose={closeSnackbar} severity={status} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}