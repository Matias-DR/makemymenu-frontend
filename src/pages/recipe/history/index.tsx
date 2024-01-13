import {
  useSession,
  getSession
} from 'next-auth/react'
import HeaderComponent from 'components/header.component'
import { useRouter } from 'next/router'
import {
  useEffect,
  useState
} from 'react'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios'
import { JwtPayload, decode } from 'jsonwebtoken'
import LoadingWindowComponent from 'components/loading-window.component'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import { TextInputComponent, type } from 'components/inputs'
import { useForm } from 'react-hook-form'

interface RecipeComponentInterface {
  id: string
  title: string
  ingredients: string
  recipe: string
  handleModify: (id: string, title: string) => void
  handleDelete: () => void
}

const RecipeComponent = ({
  id,
  title,
  ingredients,
  recipe,
  handleModify,
  handleDelete
}: RecipeComponentInterface) => {
  const [modifyingTitle, setModifyingTitle] = useState(false)
  const [titleValue, setTitleValue] = useState(title)

  const changeTitle = () => {
    handleModify(String(id), titleValue)
  }

  return <div className='w-full h-36 flex mb-2'>
    {/* recipe-container */}
    <div className='flex flex-col w-11/12 ml-2 border-solid bg-[#242424] border border-[#534c98] rounded-lg'>
      {/* title */}
      <div className='w-full pt-[.75rem]'>
        {
          !modifyingTitle ?
            <h2 className='text-white m-0 px-2'>{titleValue ? titleValue : 'Receta Sin Título'}</h2>
            :
            <TextInputComponent
              id={`titleEditor-${id}`}
              variant='standard'
              type={type.TEXT}
              label='Ingrese el título'
              onChange={(data: any) => {
                const title = data.target.value
                setTitleValue(title)
              }}
              required={true}
              className='!m-0 !ml-2 p-0 mx-2 !mt-[-.75rem] w-11/12'
              placeHolederFontFamily='Nabla'
              inputFontFamily='Nabla'
            />
        }
      </div>
      {/* recipe */}
      <div className='flex grow w-full gray-scrollbar'>
        <p className='grow w-full m-0 px-2 text-white text-lg break-all'>
          Ingredientes: {ingredients}
          <br />
          Instrucciones: {recipe}
        </p>
      </div>
    </div>
    {/* options-container */}
    <div className='px-2 grow flex flex-col place-content-evenly items-center'>
      {/* options */}
      {
        !modifyingTitle ?
          <Button
            variant='contained'
            color='warning'
            onClick={() => setModifyingTitle(true)}
          ><EditIcon /></Button>
          :
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              setModifyingTitle(false)
              changeTitle()
            }}
          ><SaveAltIcon /></Button>
      }
      <Button
        variant='contained'
        color='error'
        onClick={handleDelete}
      ><DeleteIcon /></Button>
    </div>
  </div>
}

interface Recipe {
  id: string
  ingredients: string
  title: string
  recipe: string
}

interface Props {
  recipeList: Recipe[]
}

export default function History({ recipeList }: Props) {
  const session = useSession()
  const router = useRouter()

  const [recipes, setRecipes] = useState<Recipe[]>(recipeList)

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/user/auth/sign-in')
    }
  }, [session])

  useEffect(() => {
    if (session === null || session.status === 'unauthenticated') return
    let email
    if (session.data?.provider === 'credentials') {
      email = (decode(session.data?.user.accessToken as string) as JwtPayload).email
    } else {
      email = (decode(session.data?.user.id_token as string) as JwtPayload).email
    }
    // axios.get(`api`, { params: { email } })
    //   .then((res: any) => {
    //     setRecipes(res.data)
    //   })
  }, [])

  useEffect(
    () => { },
    [recipes]
  )

  if (session.status === 'loading') return <LoadingWindowComponent />

  const handleModify = (id: string, title: string) => {
    console.log(id, title)
    let recipeChanged = { id: '', title: '' }
    setRecipes(recipes.map((recipe: Recipe) => {
      console.log(typeof recipe.id, recipe.id, typeof id, id)
      if (String(recipe.id) === String(id)) {
        recipeChanged = { id, title }
        return { ...recipe, title }
      }
      return recipe
    }))
    console.log('estas son las recipes', recipes)
    console.log('esta es la recipe cambiada', recipeChanged)
    // change button to save
    // when save is clicked, change button to modify
  }

  const handleDelete = () => {
    // axios.delete('api', id)
  }

  return <main className='h-full w-full flex flex-col'>
    {session.status === 'authenticated' && <HeaderComponent />}

    {session.status === 'authenticated' && <div className='grow w-full gray-scrollbar'>
      {
        recipes
          .map((
            recipe: { id: string, ingredients: string, title: string, recipe: string }
          ) => <RecipeComponent
              key={`recipe-${recipe.id}`}
              id={recipe.id}
              title={recipe.title}
              ingredients={recipe.ingredients}
              recipe={recipe.recipe}
              handleModify={handleModify}
              handleDelete={handleDelete}
            />)
      }
    </div>}
  </main>
}

export async function getServerSideProps(context: any) {
  const session = await getSession({
    ctx: context,
    req: context.req
  })
  const recipeList = [{
    id: '0',
    title: 'Ensalada de Verano Fresca',
    ingredients: 'Lechuga, tomate, pepino, aceitunas, aderezo de limón.',
    recipe: 'Corta y mezcla todos los ingredientes. Aliña con aderezo de limón.'
  }, {
    id: '1', title: 'Pollo al Curry Fácil',
    ingredients: 'Pechuga de pollo, curry, cebolla, leche de coco.',
    recipe: 'Saltea pollo y cebolla, añade curry y leche de coco. Cocina hasta que esté tierno.'
  }, {
    id: '2',
    title: 'Tacos Vegetarianos con Guacamole',
    ingredients: 'Tortillas, frijoles, aguacate, tomate, cilantro.',
    recipe: 'Rellena tortillas con frijoles, guacamole y tomate. Decora con cilantro.'
  }, {
    id: '3',
    title: 'Sopa de Tomate Casera',
    ingredients: 'Tomates, cebolla, ajo, caldo de verduras.',
    recipe: 'Saltea tomates, cebolla y ajo. Añade caldo y cocina a fuego lento.'
  }, {
    id: '4',
    title: 'Pasta con Salsa de Albóndigas',
    ingredients: 'Pasta, albóndigas, tomate, albahaca.',
    recipe: 'Cocina albóndigas y salsa de tomate. Sirve sobre pasta.'
  }, {
    id: '5',
    title: 'Batido de Frutas Energético',
    ingredients: 'Plátano, fresas, leche, miel.',
    recipe: 'Mezcla frutas, leche y miel en una licuadora. Sirve frío.'
  }, {
    id: '6',
    title: 'Tarta de Manzana Rústica',
    ingredients: 'Masa para tarta, manzanas, azúcar, canela.',
    recipe: 'Rellena masa con manzanas, azúcar y canela. Hornea hasta dorar.'
  }, {
    id: '7',
    title: 'Arroz Frito con Verduras',
    ingredients: 'Arroz, zanahorias, guisantes, huevo, salsa de soja.',
    recipe: 'Saltea verduras y huevo, añade arroz y salsa de soja. Cocina hasta que esté listo.'
  }]
  return { props: { session, recipeList } }
}
