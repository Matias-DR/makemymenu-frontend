import { useSession } from 'next-auth/react'
import HeaderComponent from 'components/header.component'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useRouter } from 'next/router'
import {
  useEffect,
  useState
} from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import { INGREDIENTS } from 'lib/constants'
import Button from '@mui/material/Button'
import { colors } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function Home() {
  const session = useSession()
  const router = useRouter()

  const [meats, setMeats] = useState<boolean>(true)
  const [vegetables, setVegetables] = useState<boolean>(true)
  const [fruits, setFruits] = useState<boolean>(true)

  const [ingredients, setIngredients] = useState<{ [index: string]: boolean }>({})

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/user/auth/sign-in')
    }
  }, [session, ingredients])

  if (session.status === 'loading') return <main><p>Cargando...</p></main>

  let meatIngredients: JSX.Element[] = []
  Object.keys(INGREDIENTS.meats).
    forEach(key => {
      meatIngredients = INGREDIENTS.meats[key].map((ingredient: string) => {
        return <Grid key={`grid-${key}-${ingredient}`}>
          <Button
            key={`button-${key}-${ingredient}`}
            variant={ingredients[ingredient] ? 'contained' : 'outlined'}
            size='small'
            sx={{
              fontWeight: 'bold',
              backgroundColor: ingredients[ingredient] ? colors.red[100] : 'transparent',
              color: colors.red[500],
              borderColor: colors.red[500],
            }}
            onClick={() => setIngredients({
              ...ingredients,
              [ingredient]: !ingredients[ingredient]
            })
            }
          >
            {ingredient}
          </Button>
        </Grid>
      })
    })

  const vegetableIngredients: JSX.Element[] = INGREDIENTS.vegetables.map((ingredient: string) => {
    return <Grid key={`grid-vegetable-${ingredient}`}>
      <Button
        key={`button-vegetable-${ingredient}`}
        variant={ingredients[ingredient] ? 'contained' : 'outlined'}
        size='small'
        sx={{
          fontWeight: 'bold',
          backgroundColor: ingredients[ingredient] ? colors.green[100] : 'transparent',
          color: colors.green[500],
          borderColor: colors.green[500],
        }}
        onClick={() => setIngredients({
          ...ingredients,
          [ingredient]: !ingredients[ingredient]
        })
        }
      >
        {ingredient}
      </Button>
    </Grid>
  })

  const fruitIngredients: JSX.Element[] = INGREDIENTS.fruits.map((ingredient: string) => {
    return <Grid key={`grid-vegetable-${ingredient}`}>
      <Button
        key={`button-vegetable-${ingredient}`}
        variant={ingredients[ingredient] ? 'contained' : 'outlined'}
        size='small'
        sx={{
          fontWeight: 'bold',
          backgroundColor: ingredients[ingredient] ? colors.orange[100] : 'transparent',
          color: colors.orange[500],
          borderColor: colors.orange[500],
        }}
        onClick={() => setIngredients({
          ...ingredients,
          [ingredient]: !ingredients[ingredient]
        })
        }
      >
        {ingredient}
      </Button>
    </Grid>
  })

  return <main className='h-full w-full'>
    <HeaderComponent />
    {/* ↓ FILTER ↓ */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant='contained' aria-label='text button group'>
        <Button
          variant={meats ? 'contained' : 'outlined'}
          onClick={() => setMeats(!meats)}
        >Carnes</Button>
        <Button
          variant={vegetables ? 'contained' : 'outlined'}
          onClick={() => setVegetables(!vegetables)}
        >Verduras</Button>
        <Button
          variant={fruits ? 'contained' : 'outlined'}
          onClick={() => setFruits(!fruits)}
        >Frutas</Button>
      </ButtonGroup>
    </Box>
    {/* ↑ FILTER ↑ */}
    {/* ↓ INGREDIENTS ↓ */}
    <Box
      sx={{ flexGrow: 1 }}
      className='justify-center w-full'
    >
      {meats && <Grid
        container
        spacing={1}
        className='w-full justify-center'
        sx={{
          background: 'rgba(183, 28, 28, 0.1)',
          backdropFilter: 'blur( 2px )',
          webkitBackdropFilter: 'blur( 2px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.1 )',
          marginBottom: '0.5rem'
        }}
      >
        {meatIngredients}
      </Grid>}
      {vegetables && <Grid
        container
        spacing={1}
        className='w-full justify-center'
        sx={{
          background: 'rgba(27, 94, 32, 0.3)',
          backdropFilter: 'blur( 2px )',
          webkitBackdropFilter: 'blur( 2px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.1 )',
          marginBottom: '0.5rem'
        }}
      >
        {vegetableIngredients}
      </Grid>}
      {fruits && <Grid
        container
        spacing={1}
        className='w-full justify-center'
        sx={{
          background: 'rgba(245, 127, 23, 0.3)',
          backdropFilter: 'blur( 2px )',
          webkitBackdropFilter: 'blur( 2px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.1 )',
        }}
      >
        {fruitIngredients}
      </Grid>}
    </Box>
    {/* ↑ INGREDIENTS ↑ */}
  </main>
}