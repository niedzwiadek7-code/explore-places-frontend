import ApiService from '@/services/ApiService/ApiService'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'
import { IActivity } from '@/services/activities/types'
import { activityTransformer } from '@/services/activities/transformers'

export class Activities {
  readonly apiService: ApiService

  constructor(token: string) {
    this.apiService = ApiBackendSingleton.getInstance()

    if (token) {
      ApiBackendSingleton.setToken(token)
    }
  }

  async getActivities(count: number) {
    const results = await this.apiService.get<IActivity[]>(`/api/get-activities?count=${count}`)
    return results.map((iActivity) => activityTransformer(iActivity))
  }
}
