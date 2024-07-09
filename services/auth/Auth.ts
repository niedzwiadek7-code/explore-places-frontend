import ApiService from "@/services/ApiService/ApiService";
import { ApiBackendSingleton } from "@/services/ApiService/Singleton";

export class Auth {
  readonly apiService: ApiService

  constructor() {
     this.apiService = ApiBackendSingleton.getInstance()
  }

  async sendEmail(email: string) {
    await this.apiService.post('/api/send-login-email/', { email })
    return true
  }
}

export class AuthSingleton {
  private static instance: Auth

  static getInstance(): Auth {
    if (!AuthSingleton.instance) {
      AuthSingleton.instance = new Auth()
    }

    return AuthSingleton.instance
  }
}
