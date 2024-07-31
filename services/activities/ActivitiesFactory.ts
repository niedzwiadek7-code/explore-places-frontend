import { Activities } from '@/services/activities/Activities'
import { ActivitiesStub } from '@/services/activities/ActivitiesStub'

export class ActivitiesFactory {
  public static create(token: string | null): Activities {
    if (process.env.EXPO_PUBLIC_STUB === 'true') {
      return new ActivitiesStub(token || '')
    }

    return new Activities(token || '')
  }
}
