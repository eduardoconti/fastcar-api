import { IController } from "@/app/controllers"
import { Http } from "./http"
import { IRoute } from "./route.interface"

export interface IRouter {
  routes?: IRoute[],
  execute(request: Http.Request,
    response: Http.Response): Promise<void>,
  post<R>(path: string, controller: IController<R>): void
  get<R>(path: string, controller: IController<R>): void
}