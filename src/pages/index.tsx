import {
  useSession,
  signOut,
  getSession
} from 'next-auth/react'
import { Button } from '@mui/material'
import Link from 'next/link'
import axios from 'axios'
import UserUpdateComponent from 'components/user/update.component'

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
          <Button
            type='button'
            variant='contained'
            color='primary'
            onClick={async () => {
              // tiene que ingresar la contra si es credentials
              let result
              if (session.data!.provider === 'credentials') {
                result = await axios.post(
                  '/api/user/delete',
                  { password: '123123123' },
                  { headers: { Authorization: `Bearer ${session.data!.user.accessToken}` } }
                )
              } else {
                result = await axios.post(
                  '/api/user/provider-delete',
                  { provider: session.data!.provider },
                  { headers: { Authorization: `Bearer ${session.data!.user.id_token}` } }
                )
              }
              if (result.status === 200) signOut()
            }}
          >Eliminar usuario</Button>
          <UserUpdateComponent />
        </>
    }
  </main>
}