import { IController } from "@/app/controllers"

export interface IRoute {
  controller: IController
  path: string
  method: string
  middleware?: any[]
}