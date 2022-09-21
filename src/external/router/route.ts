import { IController } from "@/app/controllers"
import { Http, IRoute } from "../interfaces"

export class Route implements IRoute{
  controller!: IController
  path!: string
  method!: string
  middleware?: any[]
  auth?: Http.AuthenticationType
  
  constructor(
    path: string,
    method: string,
    controller: IController,
    auth?: Http.AuthenticationType,
    middleware?: any[],
  ){
    this.controller = controller
    this.path = path
    this.method = method
    this.middleware = middleware
    this.auth = auth
  }
  
}

