export class ExternalLinksModel {
  readonly _wikipedia?: string

  readonly _website?: string

  constructor(wikipedia?: string, website?: string) {
    this._wikipedia = wikipedia
    this._website = website
  }

  public get wikipedia(): string | undefined {
    return this._wikipedia
  }

  public get website(): string | undefined {
    return this._website
  }

  public linkExists(): boolean {
    return Object.values(this).some((value) => Boolean(value))
  }
}
