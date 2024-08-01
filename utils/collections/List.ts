export class ListItem<T> {
  private list: List<T>

  readonly index: number

  public value: T

  constructor(
    list: List<T>,
    index: number,
    value: T,
  ) {
    this.list = list
    this.index = index
    this.value = value
  }

  prev() {
    return this.list.get(this.index - 1)
  }

  next() {
    return this.list.get(this.index + 1)
  }
}

export class List<T> {
  readonly items: T[]

  constructor(items: T[]) {
    this.items = items
  }

  size() {
    return this.items.length
  }

  get(index: number) {
    return new ListItem(this, index, this.items[index])
  }

  add(item: T) {
    this.items.push(item)
  }
}
