import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'

export default function UserSignOutComponent() {
  return <Button
    type='button'
    variant='contained'
    color='primary'
    onClick={() => signOut()}
  >Cerrar Sesión</Button>
}