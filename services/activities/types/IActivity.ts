export type IActivity = {
  id: number
  name: string
  description: string
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
}
