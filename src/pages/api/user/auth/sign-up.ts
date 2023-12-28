import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import {
  HOST
} from 'lib/constants'

type Data = {
  email: string
  password: string
  passwordConfirmation: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = {
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation
  }
  try {
    const response = await axios.post(`${HOST}/user`, data)
    res.status(200).json(response.data)
  } catch (error: any) {
    res.status(500).json(error.response.data)
  }
}
