import { Veichle } from "@/domain/entities"

export type RegisterVeichleDTO = Omit<Veichle, 'id'>

export interface IRegisterVeichle {
  register(veichle: RegisterVeichleDTO): Promise<Veichle>
}