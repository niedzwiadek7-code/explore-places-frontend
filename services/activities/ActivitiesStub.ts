import { Activities } from '@/services/activities/Activities'
import ApiService from '@/services/ApiService/ApiService'
import {
  activitiesData, unauthorizedError,
} from '@/services/activities/test/data'
import { activityTransformer } from '@/services/activities/transformers'

export class ActivitiesStub implements Activities {
  readonly apiService: ApiService = new ApiService('')

  readonly activitiesData = activitiesData

  constructor(token: string) {
    if (token) {
      this.apiService.setToken(token)
    }
  }

  async getActivities(count: number) {
    if (this.apiService.getToken() !== 'accessToken') {
      throw new Error(unauthorizedError.detail)
    }
    const results = this.activitiesData.slice(0, count)
    return results.map((iActivity) => activityTransformer(iActivity))
  }
}