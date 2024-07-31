import { Activities } from '@/services/activities/Activities'
import ApiService from '@/services/ApiService/ApiService'
import {
  activitiesData, unauthorizedError,
} from '@/services/activities/test/data'

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
    return this.activitiesData.slice(0, count)
  }
}
