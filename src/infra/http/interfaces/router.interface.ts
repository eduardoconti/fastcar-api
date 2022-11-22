import { IController } from "@/app/interfaces"
import { Http } from "./http"
export interface IRouter {
  routes?: IRoute[],
  execute(request: Http.Request,
    response: Http.Response): Promise<void>,
  post<R>(routeParams: RouteParams<R>): void
  get<R>(routeParams: RouteParams<R>): void
}

export interface IRoute<C = any> {
  controller: IController<C>
  path: string
  method: Http.Methods
  middleware?: any[]
  auth?: Http.AuthenticationType
  atributes?: Atributes
}

export type RouteParams<C> = Omit<IRoute<C>, 'method'>
export type AddRouteParams<C> = IRoute<C>

export interface Atributes {
  [key: string]: string;
}
