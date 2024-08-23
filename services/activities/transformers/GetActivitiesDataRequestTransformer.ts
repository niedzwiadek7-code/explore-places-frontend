import { CoordinatesModel } from '@/models'
import { IGetActivitiesData } from '@/services/activities/types'

export const getActivitiesDataRequestTransformer = (
  coordinates?: CoordinatesModel,
): IGetActivitiesData => {
  const payload:IGetActivitiesData = {}

  if (coordinates) {
    payload.latitude = coordinates.latitude
    payload.longitude = coordinates.longitude
  }

  return payload
}
