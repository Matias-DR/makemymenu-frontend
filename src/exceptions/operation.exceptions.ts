export class UnsuccesfulOperationException extends Error {
  constructor() {
    super('Unsuccesful operation')
  }
}

export class SomethingWentWrongOperationException extends Error {
  constructor() {
    super('Something went wrong')
  }

}

const exceptions = {
  UnsuccesfulOperationException,
  SomethingWentWrongOperationException
}

export default exceptions