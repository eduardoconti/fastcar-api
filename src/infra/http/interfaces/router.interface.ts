import { IController } from "@app/interfaces";

import {
   HttpAuthenticationType,
   HttpMethods,
   HttpRequest,
   HttpResponse,
} from "./http";

export interface IRouter {
   routes?: IRoute[];
   execute(request: HttpRequest, response: HttpResponse): Promise<void>;
   post<R>(routeParams: RouteParams<R>): void;
   get<R>(routeParams: RouteParams<R>): void;
}

export interface IRoute<C = any> {
   controller: IController<C>;
   path: string;
   method: HttpMethods;
   middleware?: any[];
   auth?: HttpAuthenticationType;
   atributes?: Atributes;
}

export type RouteParams<C> = Omit<IRoute<C>, "method">;
export type AddRouteParams<C> = IRoute<C>;

export interface Atributes {
   [key: string]: string;
}
