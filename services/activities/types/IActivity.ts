export type IActivity = {
  id: number
  name: string
  description: string | null
  images: string[]
  destination_resource: string
  migration_data: Record<string, string>
  owner: string | null
  liked_by_user?: boolean

  address: {
    id: number,
    street: string
    city: string | null
    state: string
    country: string
    postal_code: string
  }

  coordinates: {
    latitude: number
    longitude: number
  }

  external_links: {
    id: number
    wikipedia_url: string | null
    website_url: string | null
  }

  tags: string[],

  translation?: {
    id: number,
    name: string,
    description: string | null,
    activity: number,
    language: string
  },
  point_field: string,
  original_language: string
}
