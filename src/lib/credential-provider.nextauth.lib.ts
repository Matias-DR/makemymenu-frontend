import { NoCredentialsProvidedException } from 'exceptions/sign-in.exceptions'
import connection from 'lib/mongodb.lib'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import 'dotenv/config'
import { SessionStrategy } from 'next-auth'
import {
  PROVIDER_MONGODB_DB,
  HOST
} from 'lib/constants'

export const CredentialProviderNextAuthLib = {
  adapter: MongoDBAdapter(connection, {
    databaseName: PROVIDER_MONGODB_DB
  }),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' as SessionStrategy },
  pages: { signIn: '/user/auth/sign-in' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      authorize: async (credentials, req): Promise<any> => {
        if (credentials === null || credentials === undefined) {
          throw new NoCredentialsProvidedException()
        }
        const form = {
          email: credentials.email,
          password: credentials.password,
        }
        return axios.post(`${HOST}/auth`, form)
          .then((res: any) => res.data)
          .catch((error: any) => {
            if (error && error.response && error.response.data) {
              throw new Error(error.response.data)
            }
          })
      }
    })
  ],
  callbacks: {
    jwt: async (all: any) => {
      const { token, user, account } = all
      if (user) {
        token.provider = account.provider
        if (token.provider !== 'credentials') {
          token.user = { id_token: account.id_token }
        } else {
          token.user = {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken
          }
        }
      }
      return token
    },
    session: async (all: any) => {
      const { token, session } = all
      if (token) {
        session.provider = token.provider
        session.user = token.user
      }
      return session
    }
  },
  events: {
    async signOut({ token, session }: any) {
      const accessToken = token.user.accessToken
      const result = await axios.delete(
        `${HOST}/session/access`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
        .then((res: any) => {
          ;
        })
        .catch((error: any) => {
          if (error && error.response && error.response.data) {
            throw new Error(error.response.data)
          }
        })
      return result
    },
    async signIn({ user, account, profile, isNewUser }: any) {
      return await axios.post(
        `${HOST}/auth/provider`,
        { email: user.email }
      )
        .then((res: any) => {
          return {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            provider: account.provider
          }
        })
        .catch((error: any) => null)
    },
    async createUser({ user, account, profile, isNewUser }: any) { },
    async linkAccount({ user, account, profile, isNewUser }: any) { },
    async session({ session, token, user }: any) { },
    async error({ message, debug }: any) { }
  },
}

export default CredentialProviderNextAuthLib