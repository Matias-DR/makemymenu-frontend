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
  useSession,
  signOut
} from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { PASSWORD_PATTERN, css } from 'lib/constants'
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export default function UserDeleteComponent() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { data: session } = useSession()

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

  const onSubmit = async (data: any): Promise<void> => {
    setIsSubmitting(true)
    let result
    if (session!.provider === 'credentials') {
      result = await axios.post(
        '/api/user/delete',
        { password: data.password },
        { headers: { Authorization: `Bearer ${session!.user.accessToken}` } }
      ).then(async (res: any) => {
        setStatus('success')
        setSnackbarMessage('Usuario eliminado correctamente')
        openSnackbar()
        setIsSubmitting(false)
        return res
      })
        .catch((err: any) => {
          setStatus('error')
          setSnackbarMessage(err.response.data)
          openSnackbar()
          setIsSubmitting(false)
          return err.response.data
        })
    } else {
      result = await axios.post(
        '/api/user/provider-delete',
        { provider: session!.provider },
        { headers: { Authorization: `Bearer ${session!.user.id_token}` } }
      )
    }
    if (result.status === 200) signOut()
  }

  return (
    <div>
      <Button
        type='button'
        color='primary'
        onClick={handleOpen}
      >Eliminar usuario</Button>
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
          <Box sx={{
            ...style,
            display: 'flex',
            flexDirection: 'column',
            placeContent: 'space-evenly',
            alignItems: 'center',
          }}>
            <h3 style={{
              margin: '0',
              fontSize: '2rem',
            }} >ELIMINACIÓN</h3>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              style={{
                ...css.blackTransparent,
                padding: '.1rem',
                paddingLeft: '1.1rem',
                paddingRight: '1.1rem',
                paddingTop: '1rem',
                paddingBottom: '.7rem',
              }}
            >
              <fieldset style={{ borderStyle: 'none' }}>
                <TextInputComponent
                  id='password'
                  type={type.PASSWORD}
                  label='Contraseña actual'
                  register={register}
                  required={false}
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
                >Confirmar</LoadingButton>
                <Button
                  variant='contained'
                  onClick={handleClose}
                >Cancelar</Button>
              </div>
            </form>
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