import { AddressModel, CoordinatesModel } from '@/models'

export class ActivityModel {
  readonly _name: string

  readonly _description: string

  readonly _images: string[]

  readonly _address: AddressModel

  readonly _coordinates: CoordinatesModel

  constructor(
    name: string,
    description: string,
    images: string[],
    address: AddressModel,
    coordinates: CoordinatesModel,
  ) {
    this._name = name
    this._description = description
    this._images = images
    this._address = address
    this._coordinates = coordinates
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

  public get images(): string[] {
    return this._images
  }
}
