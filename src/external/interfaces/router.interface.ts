import { HttpRequest, HttpResponse, IController } from "@/app/controllers"
import { IRoute } from "./route.interface"

export interface IRouter {
  routes?: IRoute[],
  execute(request: HttpRequest,
    response: HttpResponse): Promise<void>,
  post<R>(path: string, controller: IController<R>): void
  get<R>(path: string, controller: IController<R>): void
}