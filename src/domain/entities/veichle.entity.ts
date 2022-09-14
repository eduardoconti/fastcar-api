export class Veichle {
  id!: string
  userId!: string
  value!: number

  private constructor(veichle: Veichle) {
    Object.assign(this, veichle)
  }

  static build(veichle: Veichle) {
    return new Veichle(veichle)
  }
}