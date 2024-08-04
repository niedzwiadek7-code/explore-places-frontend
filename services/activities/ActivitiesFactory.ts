import { Activities } from '@/services/activities/Activities'
import { ActivitiesStub } from '@/services/activities/ActivitiesStub'

export class ActivitiesFactory {
  private static instance: Activities

  public static create(token: string | null): Activities {
    if (!ActivitiesFactory.instance) {
      if (process.env.EXPO_PUBLIC_STUB === 'true') {
        ActivitiesFactory.instance = new ActivitiesStub(token || '')
      } else {
        ActivitiesFactory.instance = new Activities(token || '')
      }
    }

    return ActivitiesFactory.instance
  }
}
