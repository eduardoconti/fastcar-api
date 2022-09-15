import { HttpRequest, HttpResponse, IController } from "@/app/controllers"
import { IRoute } from "./route.interface"

export interface IRouter {
  routes?: IRoute[],
  execute(request: HttpRequest,
    response: HttpResponse): Promise<void>,
  post(path: string, controller: IController): void
  get(path: string, controller: IController): void
}