import { Activities } from '@/services/activities/Activities'
import { ActivitiesStub } from '@/services/activities/ActivitiesStub'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'

export class ActivitiesSingleton {
  private static instance: Activities

  public static getInstance(): Activities {
    if (!ActivitiesSingleton.instance) {
      if (process.env.EXPO_PUBLIC_STUB === 'true') {
        ActivitiesSingleton.instance = new ActivitiesStub()
      } else {
        const apiService = ApiBackendSingleton.getInstance()
        ActivitiesSingleton.instance = new Activities(apiService)
      }
    }

    return ActivitiesSingleton.instance
  }
}
