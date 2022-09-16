import { IController } from "@/app/controllers"
import { IRoute } from "../interfaces"

export class Route implements IRoute{
  controller!: IController<any>
  path!: string
  method!: string
  middleware?: any[]

  
  constructor(
    path: string,
    method: string,
    controller: IController<any>,
    middleware?: any[]
  ){
    this.controller = controller
    this.path = path
    this.method = method
    this.middleware = middleware
  }
  
}

