import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  email: string
  password: string
  passwordConfirmation: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('llega a la api')
  const data = {
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation
  }
  let response: any
  try {
    response = await axios.post('http://192.168.0.7:4000/user/sign-in', data)
    console.log('ESTO ES api/user/auth/signin')
    console.log(response.data)
    res.status(200).json(response.data)
  } catch (error: any) {
    console.log('ESTO ERROR EN api/user/auth/signin')
    console.log(error.response.status)
    console.log(error.response.data)
    res.status(500).json(error.response.data)
  }
}
