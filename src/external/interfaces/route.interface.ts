import { IController } from "@/app/controllers"
import { Http } from "./http"

export interface IRoute {
  controller: IController
  path: string
  method: string
  middleware?: any[]
  auth?: Http.AuthenticationType
}