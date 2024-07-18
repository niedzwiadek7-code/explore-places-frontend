import { AuthStub } from '@/services/auth/AuthStub'
import { Auth } from '@/services/auth/Auth'

export class AuthSingleton {
  private static instance: Auth

  static getInstance(): Auth {
    if (!AuthSingleton.instance) {
      if (process.env.EXPO_PUBLIC_STUB === 'true') {
        AuthSingleton.instance = new AuthStub()
      } else {
        AuthSingleton.instance = new Auth()
      }
    }

    return AuthSingleton.instance
  }
}
