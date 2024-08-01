export class Fifo<T> {
  private items: T[]

  constructor(items: T[] = []) {
    this.items = items
  }

  public size() {
    return this.items.length
  }

  public add(item: T) {
    this.items.push(item)
  }

  public remove() {
    return this.items.shift()
  }

  public toArray(): T[] {
    return this.items
  }
}
