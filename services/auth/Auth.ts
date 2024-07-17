import ApiService from "@/services/ApiService/ApiService";
import { ApiBackendSingleton } from "@/services/ApiService/Singleton";
import {AuthStub} from "@/services/auth/AuthStub";

export class Auth {
  readonly apiService: ApiService

  constructor() {
     this.apiService = ApiBackendSingleton.getInstance()
  }

  async createProfile(email: string) {
    await this.apiService.post('/api/users/', {
      email,
      username: email,
    })
    return true
  }

  async sendEmail(email: string) {
    await this.apiService.post('/api/send-verification-code/', { email })
    return true
  }

  async verifyEmail(email: string, code: string) {
    await this.apiService.post('/api/verify-code/', { email, code })
    return true

  }
}

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
