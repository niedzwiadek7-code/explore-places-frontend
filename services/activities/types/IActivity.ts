export type IActivity = {
  id: number
  name: string
  description: string | null
  images: string[]
  destination_resource: string
  migration_data: Record<string, string>
  address: string
  city: string | null
  state: string
  country: string
  postal_code: string
  latitude: number
  longitude: number
  owner: string | null
  liked_by_user?: boolean,
  wikipedia_url?: string | null,
  website_url?: string | null,
  tags: string[]
}
