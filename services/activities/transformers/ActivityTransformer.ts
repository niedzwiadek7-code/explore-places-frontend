import { IActivity } from '@/services/activities/types'
import {
  ActivityModel, AddressModel, CoordinatesModel, ExternalLinksModel,
} from '@/models'

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

  const externalLinks = new ExternalLinksModel(
    iActivity.wikipedia_url ? iActivity.wikipedia_url : undefined,
    iActivity?.website_url ? iActivity.website_url : undefined,
  )

  return new ActivityModel(
    iActivity.id,
    iActivity.name,
    iActivity.description || '',
    iActivity.images,
    addressModel,
    coordinatesModel,
    iActivity.liked_by_user || false,
    externalLinks,
  )
}
