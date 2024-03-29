import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import {
  useState,
  MouseEvent
} from 'react'
import { useSession } from 'next-auth/react'
import { JwtPayload, decode } from 'jsonwebtoken'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import UserUpdateComponent from './user/update.component'
import UserDeleteComponent from './user/delete.component'
import UserSignOutComponent from './user/sign-out.component'
import Link from 'next/link'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function HeaderComponent() {
  const session = useSession()
  const router = useRouter()

  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null)
  const [menu, setMenu] = useState<null | HTMLElement>(null)

  if (session.status !== 'authenticated') return null

  let email
  if (session.data.provider === 'credentials') {
    email = (decode(session.data?.user.accessToken) as JwtPayload).email
  } else {
    const decoded = decode(session.data?.user.id_token) as JwtPayload
    email = decoded!.email!
  }

  const handleUserMenu = (event: MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenu(null)
  }

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenu(null)
  }

  const goToCreateRecipe = () => {
    router.push('/recipe/create')
  }

  const goToHistory = () => {
    router.push('/recipe/history')
  }

  return <>{
    session.status === 'authenticated' && <Box>
      <AppBar
        position='static'
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            aria-controls='menu-appbar'
            onClick={handleMenu}
          ><MenuIcon /></IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={menu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(menu)}
            onClose={handleMenuClose}
            className='flex flex-col justify-center items-center'
          >
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                padding: '1 !important',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button onClick={goToCreateRecipe}>Crear una receta</Button>
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                padding: '1 !important',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button onClick={goToHistory}>Historial de recetas</Button>
            </MenuItem>
          </Menu>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            className='font-bold'
          >
            <Link
              href='/'
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontFamily: 'Nabla'
              }}
            >MakeMyMenu</Link>
          </Typography>
          {/* ↑ LADO IZQUIERDO ↑ */}
          {/* ↓ LADO DERECHO ↓ */}
          <div>
            <Chip
              aria-label='account of current user'
              aria-controls='user-menu'
              aria-haspopup='true'
              onClick={handleUserMenu}
              avatar={<Avatar alt={email as string} src={session.data?.user.image!} />}
              label={email}
              variant='filled'
              color='primary'
              sx={{ fontWeight: 'bold' }}
            />
            <Menu
              id='user-menu'
              anchorEl={userMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userMenu)}
              onClose={handleUserMenuClose}
            >
              {
                session!.data.provider === 'credentials' &&
                <MenuItem
                  onClick={handleUserMenuClose}
                  sx={{
                    padding: '1 !important',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <UserUpdateComponent />
                </MenuItem>
              }
              <MenuItem
                onClick={handleUserMenuClose}
                sx={{
                  padding: '1 !important',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <UserDeleteComponent />
              </MenuItem>
              <MenuItem
                onClick={handleUserMenuClose}
                sx={{
                  padding: '1 !important',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <UserSignOutComponent />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  }</>
}