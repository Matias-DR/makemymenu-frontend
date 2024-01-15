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
import axios from 'axios'


export default function Home() {
  const session = useSession()
  const router = useRouter()
  const storedIngredients = useSelector((state: any) => state.ingredients)
  const [id, setId] = useState<string | null>(null)
  const [recipeTitle, setRecipeTitle] = useState<string | null>(null)
  const [recipe, setRecipe] = useState<string | null>(null)
  const [recipeWriter, setRecipeWriter] = useState<string | null>(null)
  const [generationStatus, setGenerationStatus] = useState<'not-called' | 'loading' | 'finished'>('not-called')
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit
  } = useForm()
  const [modifyingTitle, setModifyingTitle] = useState<boolean>(false)
  const [apiCalled, setApiCalled] = useState<boolean>(false)

  const callAPI = async () => {
    await axios.get('/api/recipe/create')
      .then((res: any) => {
        console.log('llegó la respuesta:', res)
      })
      .catch((err: any) => {
        console.log('llegó error:', err)
      })
  }

  useEffect(() => {
    if (!apiCalled) {
      setApiCalled(true)
      callAPI()
    }
  }, [apiCalled])

  useEffect(() => {
    let recipeWrited = ''
    const writeRecipe = async () => {
      if (recipe !== null && recipe !== undefined && recipe !== '') {
        for (let index = 0; index < recipe.length; index++) {
          const char = recipe[index];

          if (char === '\n') {
            recipeWrited = recipeWrited + '<br />'
            setRecipeWriter(recipeWrited + '<br />');
          } else {
            recipeWrited = recipeWrited + char
            setRecipeWriter(recipeWrited + char);
          }

          await new Promise(resolve => setTimeout(resolve, 1));
        }
      }
    };

    writeRecipe();
  }, [recipe])

  useEffect(() => { }, [recipeWriter])

  const callRecipeGenerator = async () => {
    setGenerationStatus('loading')
    setId('')
    setTimeout(() => setRecipe('Ingredientes: Lechuga, tomate, pepino, aceitunas, aderezo de limón. Instrucciones: Lava y seca la lechuga, luego córtala en trozos. Corta los tomates y el pepino en rodajas o trozos pequeños. Si las aceitunas tienen hueso, quítales el hueso y córtalas por la mitad. En un tazón, combina la lechuga, los tomates, el pepino y las aceitunas. Rocía el aderezo de limón sobre la ensalada según tu preferencia. Mezcla los ingredientes para cubrirlos con el aderezo. Sirve la ensalada en platos individuales o en un tazón grande.'), 3000)
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

  if (session.status !== 'authenticated') return <LoadingWindowComponent />

  return <main className='h-full w-full flex flex-col'>
    <HeaderComponent />

    {/* full-page */}
    <div className='w-full grow flex flex-col items-center'>
      {/* editable-recipe-title-from-api */}
      <div className='w-11/12'>
        {
          modifyingTitle ?
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
              onBlur={() => { setModifyingTitle(false); console.log('blured') }}
            />
            :
            <h1
              className='text-white text-2xl text-center'
              onClick={() => setModifyingTitle(true)}
            >{recipeTitle ? recipeTitle : 'Ensalada de Verano Fresca'}</h1>
        }
      </div>
      {/* recipe-&-options-container */}
      <div className='w-11/12 h-full mt-4 flex flex-col place-content-between items-center'>
        {/* recipe-container */}
        <div className='w-full h-5/6 mb-2 gray-scrollbar' style={css.transparent}>
          {/* recipe-text */}
          <p className='relative w-full max-h-[1rem] m-0 px-2 py-1 text-white text-lg'>{
            recipeWriter !== '' && recipeWriter !== null && recipeWriter !== undefined ?
              recipeWriter
              :
              <div className='absolute w-6 top-[-.7rem] left-[5.5rem]'><LoadingWindowComponent /></div>
          }</p>
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