import { SomethingWentWrongOperationException } from 'exceptions/operation.exceptions'
import { MongoClient } from 'mongodb'
import {
  DEFAULT_MONGODB_DB,
  PROVIDER_MONGODB_DB,
  MONGODB_URI
} from 'lib/constants'

if (MONGODB_URI === null || MONGODB_URI === undefined) {
  throw new SomethingWentWrongOperationException()
}

const uri = MONGODB_URI

const client = new MongoClient(uri)
  .once('error', () => {
    throw new SomethingWentWrongOperationException()
  })

const connection = client.connect()

export const makemymenuDb = client.db(DEFAULT_MONGODB_DB)
export const providerAccsDb = client.db(PROVIDER_MONGODB_DB)

export default connection