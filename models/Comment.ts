export class CommentModel {
  constructor(
    private _author: string,
    private _content: string,
    private _date: Date
  ) {}

  public get author(): string {
    return this._author
  }

  public get content(): string {
    return this._content
  }

  public get date(): Date {
    return this._date
  }
}
