import { IController } from "@/app/controllers";
import { Logger } from "@/app/use-cases/logger/logger";
import { Result } from "@/domain/entities";
import { BaseError } from "@/domain/entities/error.entity";
import { ILogger } from "@/domain/interfaces";
import { Http, IRoute, IRouter } from "../interfaces";
import { Route } from "./route";

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
    const rout = this.routes?.find((e) => {
      return e.path === parsedUrl.pathname &&
        (e.method).toUpperCase() === method
    })
    if (!rout) {
      this.handleResponse(request, response, Result.fail(new BaseError(404, 'Not found', 'Rota nao encontrada!')))
      return
    }

    request.on('data', (body: any) => {
      Object.assign(request, { body: JSON.parse(body), params: parsedUrl.searchParams })
    })

    request.on('end', async () => {
      try {
        const result = await rout.controller.handle({
          body: request?.body,
          params: request?.params
        })
        this.handleResponse(request, response, result);
      } catch (error: any) {
        if (error instanceof BaseError) {
          this.handleResponse(request, response, Result.fail(error));
        } else {
          this.handleResponse(request, response, Result.fail(new BaseError(500, undefined, error?.message)))
        }
      }
    })
  }

  post<R>(path: string, controller: IController<R>): void {
    this.addRoute('POST', path, controller)
    this.logger.system('Mapped route POST' + path)
  }

  get<R>(path: string, controller: IController<R>): void {
    this.addRoute('GET', path, controller)
    this.logger.system('Mapped route GET' + path)
  }

  private handleResponse(request: Http.Request, response: Http.Response, result: Result<any>) {
    if (result.isSuccess) {
      response.writeHead(200, { "Content-Type": "application/json" })
      response.write(JSON.stringify(result.getValue()))
      this.logger.info(JSON.stringify({ body: request.body, headers: request.headers, response: result.getValue() }))
    } else {
      response.writeHead(result.error?.status ?? 500, { "Content-Type": "application/problem+json" })
      response.write(JSON.stringify(result.error))
      this.logger.error(JSON.stringify({ body: request.body, headers: request.headers, response: result.error }))
    }
    response.end()
  }

  private addRoute(method: string, path: string, controller: IController) {
    const rout = this.routes?.find((e) => {
      return e.method === method && e.path === path
    })

    if (rout) {
      throw new BaseError(500, undefined, 'Duplicated route: ' + method + ' ' + path)
    }

    this.routes?.push(new Route(path, method, controller))
  }
}


