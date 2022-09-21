import { RouteParams } from "../router"
import { Http } from "./http"
import { IRoute } from "./route.interface"

export interface IRouter {
  routes?: IRoute[],
  execute(request: Http.Request,
    response: Http.Response): Promise<void>,
  post<R>(routeParams: RouteParams<R>): void
  get<R>(routeParams: RouteParams<R>): void
}