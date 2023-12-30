import {
  useSession,
  signOut,
  getSession
} from 'next-auth/react'
import { Button } from '@mui/material'
import Link from 'next/link'
import axios from 'axios'
import UserUpdateComponent from 'components/user/update.component'
import UserDeleteComponent from 'components/user/delete.component'

export default function Home() {
  const session = useSession()

  if (session.status === 'loading') return <main><p>Cargando...</p></main>

  return <main className='h-full w-full'>
    {
      session.status === 'unauthenticated' ?
        <>
          <Link href='/user/auth/sign-in'>
            <Button
              type='button'
              variant='contained'
              color='primary'
            >Iniciar Sesión</Button>
          </Link>
          <Link href='/user/auth/sign-up'>
            <Button
              type='button'
              variant='contained'
              color='primary'
            >Registrarse</Button>
          </Link>
        </>
        :
        <>
          <Button
            type='button'
            variant='contained'
            color='primary'
            onClick={() => signOut()}
          >Cerrar Sesión</Button>
          <UserDeleteComponent />
          <UserUpdateComponent />
        </>
    }
  </main>
}