import { AddressModel, CoordinatesModel, ExternalLinksModel } from '@/models'
import { List } from '@/utils/collections'

export class ActivityModel {
  readonly _id: number

  readonly _name: string

  readonly _description: string

  readonly _images: List<string>

  readonly _address: AddressModel

  readonly _coordinates: CoordinatesModel

  private _likedByUser: boolean

  readonly _external: ExternalLinksModel

  constructor(
    id: number,
    name: string,
    description: string,
    images: string[],
    address: AddressModel,
    coordinates: CoordinatesModel,
    likedByUser: boolean,
    externalLinks: ExternalLinksModel,
  ) {
    this._id = id
    this._name = name
    this._description = description
    this._images = new List(images)
    this._address = address
    this._coordinates = coordinates
    this._likedByUser = likedByUser
    this._external = externalLinks
  }

  public get id(): number {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get description(): string {
    return this._description
  }

  public get address(): AddressModel {
    return this._address
  }

  public get coordinates(): CoordinatesModel {
    return this._coordinates
  }

  public get images(): List<string> {
    return this._images
  }

  public get likedByUser(): boolean {
    return this._likedByUser
  }

  public like(): void {
    this._likedByUser = true
  }

  public unlike(): void {
    this._likedByUser = false
  }

  public get externalLinks(): ExternalLinksModel {
    return this._external
  }
}
