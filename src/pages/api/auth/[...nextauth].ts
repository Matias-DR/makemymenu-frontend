import CredentialProviderNextAuthLib from 'lib/credential-provider.nextauth.lib'
import NextAuth, { AuthOptions } from 'next-auth'


export default NextAuth(CredentialProviderNextAuthLib as unknown as AuthOptions)
