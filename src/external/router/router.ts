import { IController } from "@/app/controllers";
import { badRequest, internalServerError, notFound, unauthorized } from "@/app/errors/errors";

import { Result } from "@/domain/entities";
import { BaseError } from "@/domain/entities/error.entity";
import { ILogger } from "@/domain/interfaces";
import { JwtAdapter } from "@/infra/adapters";
import { Logger } from "@/infra/logger";
import { Http, IRoute, IRouter } from "../interfaces";
import { Route } from "./route";

export type RouteParams<C> = {
  path: string,
  controller: IController<C>
  auth?: Http.AuthenticationType
}
type AddRouteParams<C> = RouteParams<C> & { method: Http.Methods }

export class Router implements IRouter {
  routes?: IRoute[];
  logger!: ILogger
  constructor() {
    this.routes = []
    this.logger = new Logger()
  }
  async execute(
    request: Http.Request,
    response: Http.Response
  ) {

    const parsedUrl = new URL(request.url as string, `https://${request.headers['host']}`)

    const method = request.method
    const route = this.routes?.find((e) => {
      return e.path === parsedUrl.pathname &&
        (e.method).toUpperCase() === method
    })
    if (!route) {
      return this.handleResponse(request, response, Result.fail(notFound('Rota não encontrada!')))
    }

    this.verifyAccessControl(route, request, response)
    
    request.on('data', (body: any) => {
      Object.assign(request, { body: JSON.parse(body), params: parsedUrl.searchParams })
    })

    request.on('end', async () => {
      if(method === 'POST' && !request?.body){
        this.handleResponse(request, response, Result.fail(badRequest('Corpo de requisição vazio!')))
      }
      try {
        const result = await route.controller.handle({
          body: request?.body,
          params: request?.params
        })
        this.handleResponse(request, response, result);
      } catch (error: any) {
        if (error instanceof BaseError) {
          this.handleResponse(request, response, Result.fail(error));
        } else {
          this.handleResponse(request, response, Result.fail(internalServerError(error?.message)))
        }
      }
    })
  }

  post<R>(routeParams: RouteParams<R>): void {
    this.addRoute({ method: 'POST', ...routeParams })
    this.logger.system('Mapped route POST' + routeParams.path)
  }

  get<R>(routeParams: RouteParams<R>): void {
    this.addRoute({ method: 'GET', ...routeParams })
    this.logger.system('Mapped route GET' + routeParams.path)
  }

  private handleResponse(request: Http.Request, response: Http.Response, result: Result<any>) {
    if (result.isSuccess && request.complete) {
      response.writeHead(200, { "Content-Type": "application/json" })
      response.write(JSON.stringify(result.getValue()))
      this.logger.info(JSON.stringify({ body: request.body, headers: request.headers, response: result.getValue() }))
    } else {
      response.writeHead(result.error?.status ?? 500, { "Content-Type": "application/problem+json" })
      response.write(JSON.stringify(result.error))
      this.logger.error(JSON.stringify({ body: request.body, headers: request.headers, response: result?.error }))
    }
    response.end()
  }

  private addRoute<R>(addRouteParams: AddRouteParams<R>) {
    const { path, controller, method, auth } = addRouteParams
    const route = this.routes?.find((e) => {
      return e.method === method && e.path === path
    })

    if (route) {
      throw new BaseError(500, undefined, 'Duplicated route: ' + method + ' ' + path)
    }

    this.routes?.push(new Route(path, method, controller, auth))
  }

  private verifyAccessControl(route: IRoute, request: Http.Request, response: Http.Response) {
    if (route?.auth) {
      if (!request.headers['authorization']) {
        return this.handleResponse(request, response, Result.fail(unauthorized('Token de requisição não encontrado!')))

      }
      const splitToken = request?.headers['authorization']?.split(' ')
      if (splitToken[0] !== 'Bearer' || !splitToken[1]) {
        return this.handleResponse(request, response, Result.fail(unauthorized('Token inválido!')))
      }

      const jwtService = new JwtAdapter().adapt();

      if (!jwtService.verify(splitToken[1]))
        return this.handleResponse(request, response, Result.fail(unauthorized('Falha de autenticação!')))

    }
  }
}


