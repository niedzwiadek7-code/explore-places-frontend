/* eslint-disable class-methods-use-this */

import { Auth } from '@/services/auth/Auth'
import ApiService from '@/services/ApiService/ApiService'

export class AuthStub implements Auth {
  readonly apiService: ApiService = new ApiService('')

  async config() {
    return {
      csrfToken: 'csrfToken',
    }
  }

  async createProfile(email: string): Promise<{ status: 'SUCCESS' | 'EMAIL_TAKEN' | 'ERROR' }> {
    if (email.includes('error')) {
      return { status: 'ERROR' }
    }
    if (email.includes('email_taken')) {
      return { status: 'EMAIL_TAKEN' }
    }
    return { status: 'SUCCESS' }
  }

  async loginWithPassword(email: string): Promise<{ status: 'SUCCESS' | 'ERROR' }> {
    if (email.includes('error')) {
      return { status: 'ERROR' }
    }
    return { status: 'SUCCESS' }
  }

  async sendCode(email: string): Promise<{
    status: 'SUCCESS' | 'ERROR',
    sessionId?: string,
  }> {
    if (email.includes('error')) {
      return { status: 'ERROR' }
    }
    return {
      status: 'SUCCESS',
      sessionId: 'sessionId',
    }
  }

  async verifyEmail(code: string): Promise<{ status: 'SUCCESS' | 'INCORRECT_CODE' | 'ERROR' }> {
    if (code === '123456') {
      return { status: 'SUCCESS' }
    }
    if (code === '654321') {
      return { status: 'INCORRECT_CODE' }
    }
    return { status: 'ERROR' }
  }

  async logout(): Promise<void> {
    await Promise.resolve()
  }

  async getSessionDetails(): Promise<{
    status: 'SUCCESS' | 'AUTH ERROR' | 'ERROR',
  }> {
    return { status: 'SUCCESS' }
  }
}
