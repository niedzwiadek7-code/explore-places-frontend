type Error = {
  message: string,
  code: string,
  param: string
}

export type IError = {
  status: number,
  errors: Array<Error>
}
