import { IActivity } from '@/services/activities/types'
import { ActivityModel, AddressModel, CoordinatesModel } from '@/models'

export const activityTransformer = (iActivity: IActivity): ActivityModel => {
  const addressModel = new AddressModel(
    iActivity.address,
    iActivity.city || '',
    iActivity.state,
    iActivity.country,
    iActivity.postal_code,
  )

  const coordinatesModel = new CoordinatesModel(
    iActivity.latitude,
    iActivity.longitude,
  )

  return new ActivityModel(
    iActivity.name,
    iActivity.description,
    iActivity.images,
    addressModel,
    coordinatesModel,
  )
}
