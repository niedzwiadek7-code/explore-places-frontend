/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Activities } from '@/services/activities/Activities'
import ApiService, {StandardResponse} from '@/services/ApiService/ApiService'
import {
  activitiesData, unauthorizedError,
} from '@/services/activities/test/data'
import { activityTransformer } from '@/services/activities/transformers'
import { ActivitiesView, ActivitiesViewSingleton } from '@/services/activities/ActivitiesView'

export class ActivitiesStub implements Activities {
  readonly apiService: ApiService = new ApiService('')

  readonly activitiesData = activitiesData

  private executionCount = 0

  async getActivities(count: number) {
    if (this.apiService.getToken() !== 'accessToken') {
      throw new Error(unauthorizedError.detail)
    }
    const results = this.activitiesData.slice(0, count).map((activity) => ({
      ...activity,
      id: activity.id + (this.executionCount * this.activitiesData.length),
    }))
    this.executionCount += 1
    return results.map((iActivity) => activityTransformer(iActivity))
  }

  async likeActivity(activityId: number) {
    return true
  }

  async unlikeActivity(activityId: number) {
    return true
  }

  async getLikedActivities() {
    return this.activitiesData
      .filter((activity) => activity.liked_by_user)
      .map((iActivity) => activityTransformer(iActivity))
  }

  getActivityViewsService(): ActivitiesView {
    const requestFn = async () => {}
    return ActivitiesViewSingleton.getInstance(requestFn)
  }

  async createComment(activityId: number, comment: string): Promise<boolean> {
    const activity = this.activitiesData.find((a) => a.id === activityId)
    if (!activity) {
      return false
    }

    if (!activity.comments) {
      activity.comments = []
    }

    activity.comments.push({
      id: activity.comments.length + 1,
      comment,
      created_at: new Date().toISOString(),
      activity: activityId,
      user: 'testUser',
    })

    return true
  }
}
