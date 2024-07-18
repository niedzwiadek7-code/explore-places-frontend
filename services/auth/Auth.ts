import ApiService from '@/services/ApiService/ApiService'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'

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
    const response = await this.apiService.post<{ access: string }>('/api/verify-code/', { email, code })
    return response
  }
}
