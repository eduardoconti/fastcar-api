export class Uuid {
  id!: string

  private constructor(id: string) {
    this.id = id
  }

  static build(id: string) {
    return new Uuid(id)
  }
}