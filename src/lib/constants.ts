import 'dotenv'

export const PROVIDER_MONGODB_DB = process.env.GOOGLE_MONGODB_DB as string
export const DEFAULT_MONGODB_DB = process.env.DEFAULT_MONGODB_DB as string
export const MONGODB_URI = process.env.MONGODB_URI as string
export const HOST = process.env.HOST as string
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string

export const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
export const PASSWORD_PATTERN = /^(?=.*[!-~])(?=.{8,64})/