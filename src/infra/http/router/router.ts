import { badRequest, internalServerError, notFound, unauthorized } from "@/app/errors/errors";
import { BaseError, Result } from "@/domain/entities";
import { ILogger } from "@/app/interfaces";
import { JwtAdapter } from "@/infra/adapters";
import { DuplicatedRouteException } from "@/infra/exceptions";
import { Logger } from "@/infra/logger";
import { BaseErrorToProblemDetailsMapper, BaseStatusToHttpMapper } from "@/infra/mapper";
import { AddRouteParams, Http, IRoute, IRouter, RouteParams } from "../interfaces";

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
    const method = request.method as Http.Methods
    const route = this.findRoute(parsedUrl.pathname, method)

    if (!route) return this.handleResponse(request, response, Result.fail(notFound('Rota não encontrada!')))

    this.verifyAccessControl(route, request, response)
    this.addCustomAtributesInRequest(request, parsedUrl.searchParams)
    this.send(request, response, route, method)

  }

  post<C>(routeParams: RouteParams<C>): void {
    this.addRoute<C>({ ...routeParams, method: 'POST', })
    this.logger.system('Mapped route POST' + routeParams.path)
  }

  get<C>(routeParams: RouteParams<C>): void {
    this.addRoute<C>({ ...routeParams, method: 'GET', })
    this.logger.system('Mapped route GET' + routeParams.path)
  }

  private handleResponse(request: Http.Request, response: Http.Response, result: Result) {
    if (result.isSuccess && request.complete) {
      let statusCode = request.method === 'POST' ? Http.StatusCode.CREATED : Http.StatusCode.OK
      response.writeHead(statusCode, { "Content-Type": "application/json" })
      response.write(JSON.stringify(result.getValue()))

      this.logger.info(JSON.stringify({ body: request.body, headers: request.headers, response: result.getValue() }))
    } else {
      let statusCode = BaseStatusToHttpMapper.map(result.error?.status)
      response.writeHead(statusCode, { "Content-Type": "application/problem+json" })
      response.write(JSON.stringify(BaseErrorToProblemDetailsMapper.map(result.error as BaseError)))
      
      this.logger.error(JSON.stringify({ body: request.body, headers: request.headers, response: result?.error }))
    }
    response.end()
  }

  private addRoute<C>(addRouteParams: AddRouteParams<C>) {
    const { path, controller, method, auth } = addRouteParams
    const route = this.routes?.find((e) => {
      return e.method === method && e.path === path
    })

    if (route) {
      throw DuplicatedRouteException.build()
    }

    this.routes?.push({ path, method, controller, auth })
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

  private addCustomAtributesInRequest(request: Http.Request, params: URLSearchParams) {
    request.on('data', (body: any) => {
      Object.assign(request, { body: JSON.parse(body), params })
    })
  }

  private send(request: Http.Request, response: Http.Response, route: IRoute, method: Http.Methods) {
    request.on('end', async () => {
      if (method === 'POST' && !request?.body) {
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

  private findRoute(path: string, method: string): IRoute | undefined {
    const route = this.routes?.find((e) => {
      return e.path === path &&
        (e.method).toUpperCase() === method
    })

    return route
  }
}


