import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import {
  HOST
} from 'lib/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.split(' ')[1]
  let response: any
  try {
    response = await axios.post(
      `${HOST}/user/delete`,
      { password: req.body.password },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    res.status(200).json(response.data)
  } catch (error: any) {
    res.status(500).json(error.response.data)
  }
}
