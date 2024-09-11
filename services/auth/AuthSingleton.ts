import { AuthStub } from '@/services/auth/AuthStub'
import { Auth } from '@/services/auth/Auth'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'

export class AuthSingleton {
  private static instance: Auth

  static getInstance(): Auth {
    if (!AuthSingleton.instance) {
      if (process.env.EXPO_PUBLIC_STUB === 'true') {
        AuthSingleton.instance = new AuthStub()
      } else {
        const apiService = ApiBackendSingleton.getInstance()
        AuthSingleton.instance = new Auth(apiService)
      }
    }

    return AuthSingleton.instance
  }
}
