import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import {
  HOST,
  OPENAI_API_KEY
} from 'lib/constants'
import OpenAI from 'openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('LLAMADA')
  const OpenAIConfiguration = { apiKey: OPENAI_API_KEY }
  const openai = new OpenAI(OpenAIConfiguration)
  await openai.chat.completions.create({
    messages: [{
      role: 'system',
      content: 'You will deliver ONLY and ONLY the instructions for a recipe (NOTHING ELSE in your recipe other than the instructions) based on the ingredients I will provide you with'
    }, {
      role: 'user',
      content: 'lechuga, tomate, pepino, aceitunas, aderezo de limón'
    }],
    model: 'gpt-3.5-turbo',
  }).then((res: any) => {
    console.log('esto es la respueta', res)
    console.log('esto es choices', res.choices)
    res.status(200).json(res.choices[0])
  }).catch((err: any) => {
    console.log('ESTE ES EL ERROR', err)
    res.status(500).json(err)
  })

  // const token = req.headers.authorization?.split(' ')[1]
  // let response: any
  // try {
  //   response = await axios.patch(
  //     `${HOST}/user`,
  //     { 
  //       newEmail: req.body.newEmail,
  //       newPassword: req.body.newPassword,
  //       newPasswordConfirmation: req.body.newPasswordConfirmation,
  //       password: req.body.password
  //     },
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   )
  //   res.status(200).json(response.data)
  // } catch (error: any) {
  //   res.status(500).json(error.response.data)
  // }
}
