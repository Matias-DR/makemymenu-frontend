import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { Button } from '@mui/material'
import Link from 'next/link'

export default function Home() {
  const session = useSession()

  if (session.status === 'loading') return <main><p>Cargando...</p></main>

  return <main>
    {
      session.status === 'unauthenticated' ?
        <Link href='/user/auth/sign-in'>
          <Button
            type='button'
            variant='contained'
            color='primary'
          >Iniciar Sesión</Button>
        </Link>
        :
        <Button
          type='button'
          variant='contained'
          color='primary'
          onClick={() => signOut()}
        >Cerrar Sesión</Button>
    }
  </main>
}