import { useSession } from 'next-auth/react'
import HeaderComponent from 'components/header.component'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/user/auth/sign-in')
    }
  }, [session])

  if (session.status === 'loading') return <main><p>Cargando...</p></main>

  return <main className='h-full w-full'>
    <HeaderComponent />
  </main>
}