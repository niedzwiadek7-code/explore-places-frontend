import { Platform } from 'react-native'
import ApiService from '@/services/ApiService/ApiService'
import { ICookies, IError, IProfileResponse } from '@/services/auth/types'

export class Auth {
  readonly apiService: ApiService

  constructor(apiBackendService: ApiService) {
    this.apiService = apiBackendService
  }

  async config(): Promise<ICookies> {
    const result = await this.apiService.get('/_allauth/browser/v1/config')

    const getCsrfToken = () => {
      if (Platform.OS === 'web') {
        const cookies = document.cookie.split(';').map((cookie) => cookie.trim())
        const csrfToken = cookies.find((cookie) => cookie.startsWith('csrftoken'))
        if (!csrfToken) {
          return ''
        }
        return csrfToken.split('=')[1]
      }

      const param = result.headers['set-cookie']
      return param.split(';')[0].split('=')[1]
    }

    return {
      csrfToken: getCsrfToken(),
    }
  }

  async createProfile(
    email: string,
    password: string,
  ): Promise<{
    status: 'SUCCESS' | 'EMAIL_TAKEN' | 'ERROR',
    sessionId?: string,
  }> {
    const response = await this.apiService.post<
      IProfileResponse | IError,
      { email: string, password: string }
    >('/_allauth/app/v1/auth/signup', {
      email,
      password,
    })
    if (response.result === 'SUCCESS') {
      return {
        status: 'SUCCESS',
        sessionId: response.data?.meta.session_token,
      }
    }
    if (response.result === 'VALIDATION ERROR' && response.data?.errors[0].code === 'email_taken') {
      return {
        status: 'EMAIL_TAKEN',
      }
    }
    return {
      status: 'ERROR',
    }
  }

  async loginWithPassword(
    email: string,
    password: string,
  ): Promise<{
    status: 'SUCCESS' | 'INCORRECT_CREDENTIALS' | 'ERROR',
    sessionId?: string,
  }> {
    const response = await this.apiService.post<
      IProfileResponse | IError,
      { email: string, password: string }
    >('/_allauth/app/v1/auth/login', {
      email,
      password,
    })
    if (response.result === 'SUCCESS') {
      return {
        status: 'SUCCESS',
        sessionId: response.data?.meta.session_token,
      }
    }

    if (response.result === 'VALIDATION ERROR' && response.data?.errors[0].code === 'email_password_mismatch') {
      return {
        status: 'INCORRECT_CREDENTIALS',
      }
    }

    return {
      status: 'ERROR',
    }
  }

  async sendCode(email: string): Promise<{
    status: 'SUCCESS' | 'ERROR',
    sessionId?: string,
  }> {
    const response = await this.apiService.post<
      IProfileResponse | IError,
      { email: string }
    >('/_allauth/app/v1/auth/code/request', { email })

    if (response.result === 'AUTH ERROR') {
      return {
        status: 'SUCCESS',
        sessionId: response.data?.meta.session_token,
      }
    }

    return {
      status: 'ERROR',
    }
  }

  async verifyEmail(code: string): Promise<{
    status: 'SUCCESS' | 'INCORRECT_CODE' | 'ERROR',
    sessionId?: string,
  }> {
    const response = await this.apiService.post<
      IProfileResponse | IError,
      { code: string }
    >('/_allauth/app/v1/auth/code/confirm', { code })

    if (response.result === 'SUCCESS') {
      return {
        status: 'SUCCESS',
        sessionId: response.data?.meta.session_token,
      }
    }

    if (response.result === 'VALIDATION ERROR' && response.data?.errors[0].code === 'incorrect_code') {
      return { status: 'INCORRECT_CODE' }
    }

    return { status: 'ERROR' }
  }

  async logout(): Promise<void> {
    await this.apiService.delete('/_allauth/app/v1/auth/session')
  }

  async getSessionDetails(): Promise<{
    status: 'SUCCESS' | 'AUTH ERROR' | 'ERROR',
  }> {
    const response = await this.apiService.get<IProfileResponse | IError>('/_allauth/app/v1/auth/session')

    switch (response.result) {
      case 'SUCCESS':
        return { status: 'SUCCESS' }
      case 'AUTH ERROR':
        if (response.statusCode === 410) {
          this.apiService.setSessionId()
        }
        return { status: 'AUTH ERROR' }
      default:
        this.apiService.setSessionId()
        return { status: 'ERROR' }
    }
  }
}
