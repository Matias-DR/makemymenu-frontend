import { useSession } from 'next-auth/react'
import { Button } from '@mui/material'
import Link from 'next/link'
import HeaderComponent from 'components/header.component'
import LoadingWindowComponent from 'components/loading-window.component'

export default function Home() {
  const session = useSession()

  if (session.status === 'loading') return <LoadingWindowComponent />

  return <main className='flex flex-col h-full w-full'>
    <HeaderComponent />
    {
      session.status === 'unauthenticated' ?
        <div className='grow w-full flex flex-col place-content-evenly items-center'>
          <Link
            href='/user/auth/sign-in'
            className='block w-96 h-24'
          >
            <Button
              type='button'
              variant='contained'
              color='primary'
              className='w-full h-full rounded-lg text-3xl'
            >Iniciar Sesión</Button>
          </Link>
          <Link
            href='/user/auth/sign-up'
            className='block w-96 h-24'
          >
            <Button
              type='button'
              variant='contained'
              color='primary'
              className='w-full h-full rounded-lg text-3xl'
            >Registrarse</Button>
          </Link>
        </div>
        :
        <div className='grow w-full flex flex-col place-content-evenly items-center'>
          <Link
            href='/recipe/create'
            className='block w-96 h-24'
          >
            <Button
              type='button'
              variant='contained'
              color='primary'
              className='w-full h-full rounded-lg text-3xl'
            >Crear receta</Button>
          </Link>
          <Link
            href='/recipe/history'
            className='block w-96 h-24'
          >
            <Button
              type='button'
              variant='contained'
              color='primary'
              className='w-full h-full rounded-lg text-3xl'
            >Historial de recetas</Button>
          </Link>
        </div>
    }
  </main>
}