export class UserModel {
  email: string

  username: string

  constructor(
    email: string,
    username: string,
  ) {
    this.email = email
    this.username = username
  }
}
