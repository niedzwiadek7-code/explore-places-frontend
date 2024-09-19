import { IActivity } from '@/services/activities/types'
import {
  ActivityModel, AddressModel, CoordinatesModel, ExternalLinksModel,
} from '@/models'

export const activityTransformer = (iActivity: IActivity): ActivityModel => {
  const addressModel = new AddressModel(
    iActivity.address.street,
    iActivity.address.city || '',
    iActivity.address.state,
    iActivity.address.country,
    iActivity.address.postal_code,
  )

  const coordinatesModel = new CoordinatesModel(
    iActivity.coordinates.latitude,
    iActivity.coordinates.longitude,
  )

  const externalLinks = new ExternalLinksModel(
    iActivity.external_links?.wikipedia_url || undefined,
    iActivity.external_links?.website_url || undefined,
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
    iActivity.distance,
    iActivity.tags,
    iActivity.translation,
  )
}
