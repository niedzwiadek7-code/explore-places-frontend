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

  public getDistance(coordinates: CoordinatesModel): number {
    return CoordinatesModel.getDistance(this, coordinates)
  }

  public toStr(): string {
    return `(${this.latitude}, ${this.longitude})`
  }

  public static toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180
  }

  public static getDistance(
    coordinates1: CoordinatesModel,
    coordinates2: CoordinatesModel,
  ): number {
    const R = 6371e3 // metres
    const φ1 = CoordinatesModel.toRadians(coordinates1.latitude)
    const φ2 = CoordinatesModel.toRadians(coordinates2.latitude)
    const Δφ = CoordinatesModel.toRadians(coordinates2.latitude - coordinates1.latitude)
    const Δλ = CoordinatesModel.toRadians(coordinates2.longitude - coordinates1.longitude)

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
      + Math.cos(φ1) * Math.cos(φ2)
      * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  public static transformDistance(distance: number): string {
    if (distance > 10000) {
      return `${(distance / 1000).toFixed(0)} km`
    }
    if (distance > 1000) {
      return `${(distance / 1000).toFixed(1)} km`
    }
    return `${Math.round(distance)} m`
  }

  public static transformDistanceFromKilometers(distance: number): string {
    if (distance > 10) {
      return `${distance.toFixed(0)} km`
    }
    if (distance > 1) {
      return `${distance.toFixed(1)} km`
    }
    return `${Math.round(distance * 1000)} m`
  }
}
