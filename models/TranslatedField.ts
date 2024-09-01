export class TranslatedField {
  readonly _original: string

  readonly _translated?: string

  constructor(original: string, translated?: string) {
    this._original = original
    this._translated = translated
  }

  public get original(): string {
    return this._original
  }

  public get translated(): string | undefined {
    return this._translated
  }
}
