import { SomethingWentWrongOperationException } from 'exceptions/operation.exceptions'
import { MongoClient } from 'mongodb'
import 'dotenv'

if (process.env.MONGODB_URI === null || process.env.MONGODB_URI === undefined) {
  throw new SomethingWentWrongOperationException()
}

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri)
  .once('error', () => {
    throw new SomethingWentWrongOperationException()
  })

const connection = client.connect()

export const makemymenuDb = client.db('makemymenu')
export const googleAccsDb = client.db('makemymenu-google-accounts')

export default connection