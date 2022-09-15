import { HttpRequest, HttpResponse, IController } from "@/app/controllers";
import { Result } from "@/domain/entities";
import { BaseError } from "@/domain/entities/error.entity";
import { IRoute, IRouter } from "../interfaces";
import { Route } from "./route";

export class Router implements IRouter {
  routes?: IRoute[];
  constructor() {
    this.routes = []
  }
  async execute(
    request: HttpRequest,
    response: HttpResponse
  ) {
    const path = request.url
    const method = request.method
    const rout = this.routes?.find((e) => {
      return e.path === path &&
        (e.method).toUpperCase() === method
    })
    if (!rout) {
      this.handleResponse(response, Result.fail(new BaseError(404, 'Not found', 'Rota nao encontrada!')))
      return
    }

    request.on('data', (body: any) => {
      Object.assign(request, { body: JSON.parse(body) })
    })

    request.on('end', async () => {
      try {
        const result = await rout.controller.handle({
          body: request.body
        })
        this.handleResponse(response, result);
      } catch (error: any) {
        if (error instanceof BaseError) {
          this.handleResponse(response, Result.fail(error));
        } else {
          this.handleResponse(response, Result.fail(new BaseError(500, '', error?.message)))
        }
      }
    })
  }

  post(path: string, controller: IController): void {
    this.routes?.push(new Route(path, 'POST', controller))
  }

  get(path: string, controller: IController): void {
    this.routes?.push(new Route(path, 'GET', controller))
  }

  private handleResponse(response: HttpResponse, result: Result<any>) {
    if (result.isSuccess) {
      response.writeHead(200, { "Content-Type": "application/json" })
      response.write(JSON.stringify(result.getValue()))
    } else {
      response.writeHead(result.error?.status ?? 500, { "Content-Type": "application/problem+json" })
      response.write(JSON.stringify(result.error))
    }
    response.end()
  }
}


