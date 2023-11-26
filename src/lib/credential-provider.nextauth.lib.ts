import { NoCredentialsProvidedException } from 'exceptions/sign-in.exceptions'
import connection from 'lib/mongodb.lib'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import 'dotenv/config'

export const CredentialProviderNextAuthLib = {
  adapter: MongoDBAdapter(connection, {
    databaseName: process.env.GOOGLE_MONGODB_DB
  }),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/user/auth/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

    }),
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials, req): Promise<any> {
        if (credentials === null || credentials === undefined) {
          throw new NoCredentialsProvidedException()
        }
        const form = {
          email: credentials.email,
          password: credentials.password,
        }
        return axios.post('http://192.168.0.7:4000/user/sign-in', form)
          .then((res: any) => {
            return res.data
          })
          .catch((error: any) => {
            if (error && error.response && error.response.data) {
              throw new Error(error.response.data)
            }
          })
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = {
          _id: user.id,
          email: user.email
        }
      }
      return token
    },
    async session({ token, session }: any) {
      if (token) {
        session.user = token.user
      }
      return session
    },
  }
}

export default CredentialProviderNextAuthLib