import { VeichleModel } from "./veichle.model"
export interface UserModel {
  id: string
  name: string
  login: string
  password: string
  veichles?: VeichleModel[]
}