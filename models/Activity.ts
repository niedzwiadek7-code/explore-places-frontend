import { List } from '@/utils/collections'
import { AddressModel } from './Address'
import { CoordinatesModel } from './Coordinates'
import { ExternalLinksModel } from './ExternalLinks'
import { TranslatedField } from './TranslatedField'

type TranslatedObj = {
  id: number,
  name: string,
  description: string | null,
  activity: number,
  language: string
}

export class ActivityModel {
  readonly _id: number

  readonly _name: TranslatedField

  readonly _description: TranslatedField

  readonly _images: List<string>

  readonly _address: AddressModel

  readonly _coordinates: CoordinatesModel

  private _likedByUser: boolean

  private _distance?: number

  readonly _external: ExternalLinksModel

  readonly _tags: string[]

  constructor(
    id: number,
    name: string,
    description: string,
    images: string[],
    address: AddressModel,
    coordinates: CoordinatesModel,
    likedByUser: boolean,
    externalLinks: ExternalLinksModel,
    distance?: number,
    tags: string[] = [],
    translation: TranslatedObj | undefined = undefined,
  ) {
    this._id = id
    this._name = new TranslatedField(name, translation?.name)
    this._description = new TranslatedField(description, translation?.description || undefined)
    this._images = new List(images)
    this._address = address
    this._coordinates = coordinates
    this._likedByUser = likedByUser
    this._external = externalLinks
    this._tags = tags

    if (distance) {
      this._distance = distance
    }
  }

  public get id(): number {
    return this._id
  }

  public get name(): TranslatedField {
    return this._name
  }

  public get description(): TranslatedField {
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

  public get distance(): number | undefined {
    return this._distance
  }

  public get externalLinks(): ExternalLinksModel {
    return this._external
  }

  public get tags(): string[] {
    return this._tags
  }
}
