export class NoCredentialsProvidedException extends Error {
  constructor() {
    super('No email or password provided')
  }
}

const exceptions = { NoCredentialsProvidedException }

export default exceptions