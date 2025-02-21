import ApiService from '@/services/ApiService/ApiService'
import { IActivity, IGetActivitiesData, IGetLikedActivitiesData } from '@/services/activities/types'
import { activityTransformer, getActivitiesDataRequestTransformer } from '@/services/activities/transformers'
import { ActivitiesView, ActivitiesViewSingleton } from '@/services/activities/ActivitiesView'
import { CoordinatesModel } from '@/models'

export class Activities {
  readonly apiService: ApiService

  constructor(apiBackendService: ApiService) {
    this.apiService = apiBackendService
  }

  async getActivities(
    count: number,
    language: string,
    coordinates?: CoordinatesModel,
    ignoreIds?: (string | number)[],
  ) {
    const results = await this.apiService.post<
      IActivity[],
      IGetActivitiesData
    >(
      `/api/activities/get-activities/?count=${count}`,
      getActivitiesDataRequestTransformer(language, coordinates, ignoreIds),
    )

    if (!results.data) {
      return []
    }

    return results.data.map((iActivity) => activityTransformer(iActivity))
  }

  async likeActivity(activityId: number) {
    await this.apiService.post(`/api/activities/like-activity/${activityId}/`)
    return true
  }

  async unlikeActivity(activityId: number) {
    await this.apiService.post(`/api/activities/unlike-activity/${activityId}/`)
    return true
  }

  async getLikedActivities(
    language: string,
    coordinates?: CoordinatesModel,
  ) {
    const results = await this.apiService.post<IActivity[], IGetLikedActivitiesData>(
      '/api/activities/liked-activities/',
      {
        language: language.split('-')[0],
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude,
      },
    )

    if (!results.data) {
      return []
    }

    return results.data.map((iActivity) => activityTransformer(iActivity))
  }

  getActivityViewsService(): ActivitiesView {
    const requestFn = async (activityIds: number[]) => {
      await this.apiService.post('/api/activities/track-views/', { activityIds })
    }

    return ActivitiesViewSingleton.getInstance(requestFn)
  }

  async createComment(
    activityId: number,
    comment: string,
    rating: number,
  ) {
    const result = await this.apiService.post(
      '/api/activities/comments/',
      {
        activity: activityId,
        comment,
        rating,
      },
    )
    return result.result === 'SUCCESS'
  }
}
