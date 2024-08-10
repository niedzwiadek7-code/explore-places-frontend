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
    const results = await this.apiService.get<IActivity[]>(`/api/activities/get-activities?count=${count}`)
    return results.map((iActivity) => activityTransformer(iActivity))
  }

  async likeActivity(activityId: number) {
    await this.apiService.post(`/api/activities/like-activity/${activityId}/`)
    return true
  }

  async unlikeActivity(activityId: number) {
    await this.apiService.post(`/api/activities/unlike-activity/${activityId}/`)
    return true
  }

  async getLikedActivities() {
    const results = await this.apiService.get<IActivity[]>('/api/activities/liked-activities/')
    return results.map((iActivity) => activityTransformer(iActivity))
  }
}
