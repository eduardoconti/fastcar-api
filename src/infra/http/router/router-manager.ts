import { notFound, unauthorized } from "@/app/errors";
import { IJwtService, ILogger } from "@/app/interfaces";
import { Result } from "@/domain/contracts";
import { JwtAdapter } from "@/infra/adapters";
import { DuplicatedRouteException } from "@/infra/exceptions";
import { Logger } from "@/infra/logger";
import { Http } from "../interfaces";
import { HttpResponseHandler } from "./http-response-handler";
import { Route } from "./route";

export class RouterManager {
  private static routes: Route[] = [];
  private static logger: ILogger = new Logger("RouterManager");
  private static jwtService: IJwtService = new JwtAdapter().adapt();

  static register(route: Route) {
    if(this.routes.find((e)=>{
      return e.method === route.method && e.path === route.path
    })){
      throw new DuplicatedRouteException(route)
    }
    this.logger.system(`mapped route: ${route.method} ${route.path}`);
    this.routes.push(route);
  }

  static async execute(request: Http.Request, response: Http.Response) {
    const method = request.method as Http.Methods;
    const route = this.findRoute(request.pathName, method);
    if (!route) {
      return HttpResponseHandler.send(
        request,
        response,
        Result.fail(notFound("Rota não encontrada!"))
      );
    }
    const accessResult = this.verifyAccessControl(route, request);
    if (accessResult.isFailure)
      return HttpResponseHandler.send(request, response, accessResult);

    const result = await route.handleController(request);
    return HttpResponseHandler.send(request, response, result);
  }

  private static findRoute(path: string, method: string): Route | undefined {
    const route = this.routes?.find((e) => {
      return e.method.toUpperCase() === method && path.match(e.regex);
    });

    return route;
  }

  private static verifyAccessControl(
    route: Route,
    request: Http.Request
  ): Result {
    if (route?.authenticationType) {
      if (!request.headers["authorization"]) {
        return Result.fail(unauthorized("Token de requisição não encontrado!"));
      }
      const splitToken = request?.headers["authorization"]?.split(" ");
      if (splitToken[0] !== "Bearer" || !splitToken[1]) {
        return Result.fail(unauthorized("Token inválido!"));
      }

      if (!this.jwtService.verify(splitToken[1]))
        return Result.fail(unauthorized("Falha de autenticação!"));
    }
    return Result.ok();
  }
}
