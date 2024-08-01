export class CoordinatesModel {
  readonly _latitude: number

  readonly _longitude: number

  constructor(latitude: number, longitude: number) {
    this._latitude = latitude
    this._longitude = longitude
  }

  public get latitude(): number {
    return this._latitude
  }

  public get longitude(): number {
    return this._longitude
  }
}
