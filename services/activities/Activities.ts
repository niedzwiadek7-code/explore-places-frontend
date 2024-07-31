import ApiService from '@/services/ApiService/ApiService'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'
import { IActivity } from '@/services/activities/types'

export class Activities {
  readonly apiService: ApiService

  constructor(token: string) {
    this.apiService = ApiBackendSingleton.getInstance()

    if (token) {
      ApiBackendSingleton.setToken(token)
    }
  }

  async getActivities(count: number) {
    return this.apiService.get<IActivity[]>(`/api/activities/?count=${count}`)
  }
}
