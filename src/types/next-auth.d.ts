import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    provider: string
    user: {
      id_token: string
      accessToken: string
      refreshToken: string
    } & DefaultSession["user"]
  }
}