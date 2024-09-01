import { CoordinatesModel } from '@/models'
import { IGetActivitiesData } from '@/services/activities/types'

export const getActivitiesDataRequestTransformer = (
  language: string,
  coordinates?: CoordinatesModel,
): IGetActivitiesData => {
  const payload:IGetActivitiesData = {
    language: language.split('-')[0],
  }

  if (coordinates) {
    payload.latitude = coordinates.latitude
    payload.longitude = coordinates.longitude
  }

  return payload
}