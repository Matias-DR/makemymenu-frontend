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
import { getServerSession } from 'next-auth/next'
import authOptions from 'pages/api/auth/[...nextauth]'
import { JwtPayload, decode } from 'jsonwebtoken'

interface RecipeComponentInterface {
  title: string
  recipe: string
  handleModify: () => void
  handleDelete: () => void
}

const RecipeComponent = ({
  title,
  recipe,
  handleModify,
  handleDelete
}: RecipeComponentInterface) => {
  return <div className='w-full h-36 flex mb-2'>
    {/* recipe-container */}
    <div className='flex flex-col w-11/12 ml-2 border-solid bg-[#242424] border border-[#534c98] rounded-lg'>
      {/* title */}
      <div className='w-full'>
        <h2 className='text-white m-0 px-2'>{title}</h2>
      </div>
      {/* recipe */}
      <div className='flex grow w-full gray-scrollbar'>
        <p className='grow w-full m-0 px-2 text-white text-lg break-all'>{recipe}</p>
      </div>
    </div>
    {/* options-container */}
    <div className='px-2 grow flex flex-col place-content-evenly items-center'>
      {/* options */}
      <Button
        variant='contained'
        color='warning'
        onClick={handleModify}
      ><EditIcon /></Button>
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
  title: string
  recipe: string
}

interface Props {
  recipeList: Recipe[]
}

export default function Home({ recipeList }: Props) {
  const session = useSession()
  const router = useRouter()

  const [recipes, setRecipes] = useState<Recipe[]>([
    { id: '1', title: 'title1', recipe: 'recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1recipe1' },
    { id: '2', title: 'title2', recipe: 'recipe2' },
    { id: '3', title: 'title3', recipe: 'recipe3' },
    { id: '4', title: 'title4', recipe: 'recipe4' },
    { id: '5', title: 'title5', recipe: 'recipe5' },
    { id: '6', title: 'title6', recipe: 'recipe6' },
    { id: '7', title: 'title7', recipe: 'recipe7' },
    { id: '8', title: 'title8', recipe: 'recipe8' }
  ])

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

  if (session.status === 'loading') return <main><p>Cargando...</p></main>

  const handleModify = () => {
    // change button to save
    // when save is clicked, change button to modify
  }

  const handleDelete = () => {
    // axios.delete('api', id)
  }

  return <main className='h-full w-full flex flex-col'>
    {session.status === 'authenticated' && <HeaderComponent />}

    {session.status === 'authenticated' && <div className='grow w-full overflow-y-scroll'>
      {
        recipes
          .map((
            recipe: { title: string, recipe: string },
            index: number
          ) => <RecipeComponent
              key={`recipe-${index}`}
              title={recipe.title}
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
  return { props: { session } }
}
