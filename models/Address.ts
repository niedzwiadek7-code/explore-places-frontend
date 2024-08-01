export class AddressModel {
  readonly _street: string

  readonly _city: string

  readonly _state: string

  readonly _country: string

  readonly _zip: string

  constructor(
    street: string,
    city: string,
    state: string,
    country: string,
    zip: string,
  ) {
    this._street = street
    this._city = city
    this._state = state
    this._country = country
    this._zip = zip
  }

  public get street(): string {
    return this._street
  }

  public get city(): string {
    return this._city
  }

  public get state(): string {
    return this._state
  }

  public get country(): string {
    return this._country
  }

  public get zip(): string {
    return this._zip
  }

  public toString(): string {
    return `${this._street}, ${this._city}, ${this._state}, ${this._country}, ${this._zip}`
  }
}
