/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

export class CommentModel {
  constructor(
    private _author: string,
    private _content: string,
    private _date: Date,
    private _rating: number,
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

  public get rating(): number {
    return this._rating
  }
}
