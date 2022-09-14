import { IDatabaseModel } from "@/domain/interfaces/database-model.interface"
import { VeichleModel } from "./veichle.model"

export interface UserModel extends IDatabaseModel {
  id: string
  name: string
  login: string
  password: string
  veichles?: VeichleModel[]
}