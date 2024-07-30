import { Activities } from '@/services/activities/Activities'

export class ActivitiesFactory {
  public static create(token: string): Activities {
    return new Activities(token)
  }
}
