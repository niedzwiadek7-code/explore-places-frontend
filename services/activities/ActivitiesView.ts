/* eslint-disable max-classes-per-file */

import Storage from '@/services/storage/Storage'
import { ActivityModel } from '@/models'

export class ActivitiesView {
  private _viewedActivities: number[] = []

  private _interval: NodeJS.Timeout | null = null

  private _intervalTime: number = 10000

  private readonly _sendViewedActivityToBackend: (activityIds: number[]) => Promise<void>

  async trackViewedActivity(activity: ActivityModel) {
    if (this._viewedActivities.includes(activity.id)) {
      return
    }
    this._viewedActivities.push(activity.id)
    await Storage.setItem('viewedActivities', JSON.stringify(this._viewedActivities))
  }

  async init() {
    const viewedActivities = await Storage.getItem('viewedActivities')
    this._viewedActivities = viewedActivities ? JSON.parse(viewedActivities) : []
    await this.sendBatchedViews()

    this.setIntervalBatchedViews()
  }

  async unmount() {
    if (this._interval) {
      clearInterval(this._interval)
    }
  }

  constructor(sendViewedActivityToBackend: (activities: number[]) => Promise<void>) {
    this._sendViewedActivityToBackend = sendViewedActivityToBackend
  }

  async sendBatchedViews() {
    // console.log('Sending batched views')
    if (this._viewedActivities.length === 0) {
      return
    }

    try {
      await this._sendViewedActivityToBackend(this._viewedActivities)
      this._viewedActivities = []
      await Storage.setItem('viewedActivities', JSON.stringify([]))
    } catch (err) {
      console.error('Error sending batched views')
      console.log(err)
    }
  }

  setIntervalBatchedViews() {
    this._interval = setInterval(async () => {
      await this.sendBatchedViews()
    }, this._intervalTime)
  }
}

export class ActivitiesViewSingleton {
  private static _instance: ActivitiesView

  static getInstance(sendViewedActivityToBackend: (activities: number[]) => Promise<void>) {
    if (!this._instance) {
      this._instance = new ActivitiesView(sendViewedActivityToBackend)
    }
    return this._instance
  }
}
