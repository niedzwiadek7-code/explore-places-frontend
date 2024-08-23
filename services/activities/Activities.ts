import ApiService from '@/services/ApiService/ApiService'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'
import { IActivity, IGetActivitiesData } from '@/services/activities/types'
import { activityTransformer, getActivitiesDataRequestTransformer } from '@/services/activities/transformers'
import { ActivitiesView, ActivitiesViewSingleton } from '@/services/activities/ActivitiesView'
import { CoordinatesModel } from '@/models'

export class Activities {
  readonly apiService: ApiService

  constructor(token: string) {
    this.apiService = ApiBackendSingleton.getInstance()

    if (token) {
      ApiBackendSingleton.setToken(token)
    }
  }

  async getActivities(
    count: number,
    coordinates?: CoordinatesModel,
  ) {
    const results = await this.apiService.post<
      IActivity[],
      IGetActivitiesData
    >(
      `/api/activities/get-activities/?count=${count}`,
      getActivitiesDataRequestTransformer(coordinates),
    )

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

  getActivityViewsService(): ActivitiesView {
    const requestFn = async (activityIds: number[]) => {
      await this.apiService.post('/api/activities/track-views/', { activityIds })
    }

    return ActivitiesViewSingleton.getInstance(requestFn)
  }
}
