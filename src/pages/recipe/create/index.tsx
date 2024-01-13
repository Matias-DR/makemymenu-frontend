import { useSession } from 'next-auth/react'
import Backdrop from '@mui/material/Backdrop'
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
import {
  FLATTENED_INGREDIENTS,
  INGREDIENTS,
  css
} from 'lib/constants'
import {
  Modal,
  colors
} from '@mui/material'
import Fade from '@mui/material/Fade'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import {
  TextInputComponent,
  type
} from 'components/inputs'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  addCustomIngredients,
  addIngredients
} from 'redux-store/states/ingredients'
import LoadingWindowComponent from 'components/loading-window.component'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

interface Ingredients { [index: string]: boolean }

export default function Home() {
  const session = useSession()
  const router = useRouter()

  const [meats, setMeats] = useState<boolean>(true)
  const [vegetables, setVegetables] = useState<boolean>(true)
  const [fruits, setFruits] = useState<boolean>(true)

  const storeState = useSelector((state: any) => state)

  const ingredientsAux: Ingredients = {}
  const custonIngredientsAux: Ingredients = {}
  if (storeState.ingredients.ingredients.length > 0) {
    storeState.ingredients.ingredients.forEach((ingredient: string) => {
      ingredientsAux[ingredient] = true
    })
  }
  if (storeState.ingredients.customIngredients.length > 0) {
    storeState.ingredients.customIngredients.forEach((customIngredient: string) => {
      custonIngredientsAux[customIngredient] = true
    })
  }

  const [ingredients, setIngredients] = useState<Ingredients>(ingredientsAux)

  const [customIngredients, setCustomIngredients] = useState<Ingredients>(custonIngredientsAux)

  const [options, setOptions] = useState(false)
  const openOptions = () => setOptions(true)
  const closeOptions = () => setOptions(false)

  const {
    register,
    handleSubmit
  } = useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/user/auth/sign-in')
    }
  }, [session, ingredients])

  if (session.status !== 'authenticated') return <LoadingWindowComponent />

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
            onClick={() => {
              const ingredientsAux = {
                ...ingredients,
                [ingredient]: !ingredients[ingredient]
              }
              setIngredients(ingredientsAux)
              const ingredientsToDispatch = Object.keys(ingredientsAux).filter((key) => ingredientsAux[key])
              dispatch(addIngredients(ingredientsToDispatch))
            }}
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
        onClick={() => {
          const ingredientsAux = {
            ...ingredients,
            [ingredient]: !ingredients[ingredient]
          }
          setIngredients(ingredientsAux)
          const ingredientsToDispatch = Object.keys(ingredientsAux).filter((key) => ingredientsAux[key])
          dispatch(addIngredients(ingredientsToDispatch))
        }}
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
        onClick={() => {
          const ingredientsAux = {
            ...ingredients,
            [ingredient]: !ingredients[ingredient]
          }
          setIngredients(ingredientsAux)
          const ingredientsToDispatch = Object.keys(ingredientsAux).filter((key) => ingredientsAux[key])
          dispatch(addIngredients(ingredientsToDispatch))
        }}
      >
        {ingredient}
      </Button>
    </Grid>
  })

  const selectedIngredientsComponent: JSX.Element[] = (
    Object.keys(ingredients).concat(Object.keys(customIngredients))
  ).map((ingredient: string) => {
    if (!ingredients[ingredient] && !customIngredients[ingredient]) return <></>
    return <Grid key={`grid-selected-${ingredient}`}>
      <Button
        key={`button-selected-${ingredient}`}
        variant={ingredients[ingredient] ? 'contained' : 'outlined'}
        size='small'
        sx={{
          fontWeight: 'bold',
          backgroundColor: ingredients[ingredient] ? colors.blue[100] : 'transparent',
          color: colors.blue[500],
          borderColor: colors.blue[500],
        }}
        onClick={() => {
          if (Object.keys(ingredients).includes(ingredient)) {
            const ingredientsAux = {
              ...ingredients,
              [ingredient]: !ingredients[ingredient]
            }
            setIngredients(ingredientsAux)
            const ingredientsToDispatch = Object.keys(ingredientsAux).filter((key) => ingredientsAux[key])
            dispatch(addIngredients(ingredientsToDispatch))
          } else {
            const customIngredientsAux: Ingredients = {
              ...customIngredients,
              [ingredient]: !customIngredients[ingredient]
            }
            setCustomIngredients(customIngredientsAux)
            const customIngredientsToDispatch = Object.keys(customIngredientsAux).filter((key: string) => customIngredientsAux[key])
            dispatch(addCustomIngredients(customIngredientsToDispatch))
          }
        }}
      >
        {ingredient}
      </Button>
    </Grid>
  })

  const addCustomIngredient = ({ customIngredient }: any) => {
    if (customIngredient === '') return
    const ingredientsSelected = Object.keys(ingredients).filter((key: string) => ingredients[key])
    if (ingredientsSelected.some(
      (ingredientSelected: string) => ingredientSelected.toUpperCase() === customIngredient.trim().toUpperCase()
    )) return
    const customIngredientsAux: Ingredients = {
      ...customIngredients,
      [customIngredient]: !customIngredients[customIngredient]
    }
    setCustomIngredients(customIngredientsAux)
    const customIngredientsToDispatch = Object.keys(customIngredientsAux).filter((key: string) => customIngredientsAux[key])
    dispatch(addCustomIngredients(customIngredientsToDispatch))
  }

  const send = () => {
    const ingrediensSelected = Object.keys(ingredients).filter((key) => ingredients[key])
    const customIngredientsSelected = Object.keys(customIngredients).filter((key) => customIngredients[key])
    dispatch(addIngredients(ingrediensSelected))
    dispatch(addCustomIngredients(customIngredientsSelected))
    router.push('/recipe')
  }

  return <main className='h-full w-full overflow-y-scroll'>
    <HeaderComponent />

    {/* ↓ FILTER ↓ */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
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
          className='font-bold'
        >Carnes</Button>
        <Button
          variant={vegetables ? 'contained' : 'outlined'}
          onClick={() => setVegetables(!vegetables)}
          className='font-bold'
        >Verduras</Button>
        <Button
          variant={fruits ? 'contained' : 'outlined'}
          onClick={() => setFruits(!fruits)}
          className='font-bold'
        >Frutas</Button>
      </ButtonGroup>

      {/* ↓ PLUS BUTTON ↓ */}
      <Fab
        color='primary'
        aria-label='add'
        size='small'
        onClick={openOptions}
        className='mr-2'
      >
        <AddIcon />
      </Fab>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={options}
        onClose={closeOptions}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={options}>
          <Box sx={style}>
            <h3 style={{
              margin: '0',
              fontSize: '2rem',
            }} >Ingredientes personalizados</h3>
            <form
              className='flex justify-center items-center flex-col divide-slate-400 bg-orange-300 rounded-md bg-opacity-25 border-solid border-2 border-red-500 pb-3'
              onSubmit={handleSubmit(addCustomIngredient)}
              noValidate
              style={{
                ...css.blackTransparent,
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <fieldset style={{ border: 'none', width: '100%' }}>
                <TextInputComponent
                  id='customIngredient'
                  type={type.TEXT}
                  label='Ingrediente/s'
                  register={register}
                  required={true}
                  className='mb-2'
                />
              </fieldset>
              <Button
                type='submit'
                variant='contained'
                color='primary'
              >Agregar</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* ↑ PLUS BUTTON ↑ */}

      <Fab
        color='success'
        aria-label='send'
        size='small'
        onClick={send}
      >
        <SendIcon />
      </Fab>

    </Box>
    {/* ↑ FILTER ↑ */}

    {/* ↓ INGREDIENTS ↓ */}
    <Box
      sx={{ flexGrow: 1 }}
      className='w-full flex flex-col items-center justify-center'
    >
      {ingredients && <Fade
        in={
          Object.entries(ingredients).some((value) => value[1] === true) ||
          Object.entries(customIngredients).some((value) => value[1] === true)
        }
      >
        <Grid
          container
          spacing={1}
          sx={{
            background: 'rgba(28, 183, 28, 0.1)',
            backdropFilter: 'blur( 2px )',
            webkitBackdropFilter: 'blur( 2px )',
            borderRadius: '10px',
            border: '1px solid rgba( 255, 255, 255, 0.1 )',
            marginBottom: '0.5rem',
            width: '99%',
          }}
          className='justify-center'
        >
          {selectedIngredientsComponent}
        </Grid>
      </Fade>}
      {meats && <Grid
        container
        spacing={1}
        sx={{
          background: 'rgba(183, 28, 28, 0.1)',
          backdropFilter: 'blur( 2px )',
          webkitBackdropFilter: 'blur( 2px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.1 )',
          marginBottom: '0.5rem',
          width: '99%',
        }}
        className='justify-center'
      >
        {meatIngredients}
      </Grid>}
      {vegetables && <Grid
        container
        spacing={1}
        className='justify-center'
        sx={{
          background: 'rgba(27, 94, 32, 0.3)',
          backdropFilter: 'blur( 2px )',
          webkitBackdropFilter: 'blur( 2px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.1 )',
          marginBottom: '0.5rem',
          width: '99%',
        }}
      >
        {vegetableIngredients}
      </Grid>}
      {fruits && <Grid
        container
        spacing={1}
        className='justify-center'
        sx={{
          background: 'rgba(245, 127, 23, 0.3)',
          backdropFilter: 'blur( 2px )',
          webkitBackdropFilter: 'blur( 2px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.1 )',
          width: '99%',
        }}
      >
        {fruitIngredients}
      </Grid>}
    </Box>
    {/* ↑ INGREDIENTS ↑ */}

  </main>
}