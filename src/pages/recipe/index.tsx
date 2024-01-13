import { useSession } from 'next-auth/react'
import HeaderComponent from 'components/header.component'
import { useRouter } from 'next/router'
import {
  useEffect,
  useState
} from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  clearCustomIngredients,
  clearIngredients
} from 'redux-store/states/ingredients'
import { TextInputComponent, type } from 'components/inputs'
import { useForm } from 'react-hook-form'
import { Button, Grid } from '@mui/material'
import { css } from 'lib/constants'
import LoadingWindowComponent from 'components/loading-window.component'

export default function Home() {
  const session = useSession()
  const router = useRouter()
  const storedIngredients = useSelector((state: any) => state.ingredients)
  const [id, setId] = useState<string | null>(null)
  const [recipeTitle, setRecipeTitle] = useState<string | null>(null)
  const [recipe, setRecipe] = useState<string | null>(null)
  const [generationStatus, setGenerationStatus] = useState<'not-called' | 'loading' | 'finished'>('not-called')
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit
  } = useForm()

  const callRecipeGenerator = async () => {
    setGenerationStatus('loading')
    setId('')
    setRecipe('')
    setRecipeTitle('')
    // const result = await axios.post('api', storedIngredients)
    // setId(result.body.id)
    // setRecipe(result.body.recipe)
    // setRecipeTitle(result.body.title)
    setGenerationStatus('finished')
  }
  if (
    recipeTitle === null &&
    recipe === null &&
    generationStatus === 'not-called'
  ) {
    callRecipeGenerator()
  }

  const callDeleteRecipe = async () => {
    // axios.delete('api', storedIngredients)
  }

  const deleteRecipe = async () => {
    callDeleteRecipe()
    dispatch(clearIngredients())
    dispatch(clearCustomIngredients())
    router.push('/recipe/create')
  }

  const modifyIngredients = () => {
    router.push('/recipe/create')
  }

  const regenerate = () => {
    callRecipeGenerator()
  }

  const createAnother = () => {
    dispatch(clearIngredients())
    dispatch(clearCustomIngredients())
    router.push('/recipe/create')
  }

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/user/auth/sign-in')
    }
  }, [session])

  if (session.status !== 'authenticated') return <LoadingWindowComponent/>

  return <main className='h-full w-full flex flex-col'>
    <HeaderComponent />

    {/* full-page */}
    <div className='w-full grow flex flex-col items-center'>
      {/* editable-recipe-title-from-api */}
      <div className='w-11/12'>
        <TextInputComponent
          className='text-white'
          variant='standard'
          id='recipe-title'
          register={register}
          placeholder='Ensalada de Verano Fresca'
          type={type.TEXT}
          textAlign='center'
          placeHolederFontFamily='Nabla'
          inputFontFamily='Nabla'
        />
      </div>
      {/* recipe-&-options-container */}
      <div className='w-11/12 h-full mt-4 flex flex-col place-content-between items-center'>
        {/* recipe-container */}
        <div className='w-full h-5/6 mb-2' style={css.transparent}>
          {/* recipe-text */}
          <p className='m-0 px-2 py-1 text-white typewriter-text'>
            Ingredientes: Lechuga, tomate, pepino, aceitunas, aderezo de limón. Instrucciones: Corta y mezcla todos los ingredientes. Aliña con aderezo de limón.
          </p>
        </div>
        {/* options-container */}
        <Grid container className='w-full grow'>
          {/* regenerate */}
          <Grid xs={12} sm={6} md={3} className='mb-2 flex flex-col justify-center items-center'>
            <Button
              variant='contained'
              color='secondary'
              onClick={regenerate}
            >Regenerar receta</Button>
          </Grid>
          {/* modify-ingredients */}
          <Grid xs={12} sm={6} md={3} className='mb-2 flex flex-col justify-center items-center'>
            <Button
              variant='contained'
              color='warning'
              onClick={modifyIngredients}
            >Modificar ingredientes</Button>
          </Grid>
          {/* create-another */}
          <Grid xs={12} sm={6} md={3} className='mb-2 flex flex-col justify-center items-center'>
            <Button
              variant='contained'
              color='info'
              onClick={createAnother}
            >Crear otra receta</Button>
          </Grid>
          {/* delete */}
          <Grid xs={12} sm={6} md={3} className='mb-2 flex flex-col justify-center items-center'>
            <Button
              variant='contained'
              color='error'
              onClick={deleteRecipe}
            >Eliminar</Button>
          </Grid>
        </Grid>
      </div>
    </div>

  </main>
}