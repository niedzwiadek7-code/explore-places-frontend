import { IActivity } from '@/services/activities/types'
import {
  ActivityModel, AddressModel, CoordinatesModel, ExternalLinksModel, CommentModel,
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
    iActivity.address.latitude,
    iActivity.address.longitude,
  )

  const externalLinks = new ExternalLinksModel(
    iActivity.external_links?.wikipedia_url || undefined,
    iActivity.external_links?.website_url || undefined,
  )

  const comments = (iActivity?.comments || []).map((comment) => new CommentModel(
    comment.user,
    comment.comment,
    new Date(comment.created_at),
    comment.rating,
  ))

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
    iActivity.translation || undefined,
    comments,
  )
}
