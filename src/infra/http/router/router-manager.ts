import { notFound } from "@/app/errors";
import { Result } from "@/domain/contracts";
import { Http } from "../interfaces";
import { HttpResponseHandler } from "./http-response-handler";
import { Route } from "./route";

export class RouterManager {
  private static routes: Route[] = [];

  static register(route: Route) {
    this.routes.push(route);
  }

  static async execute(
    request: Required<Http.Request>,
    response: Http.Response
  ) {
    const method = request.method as Http.Methods;
    const route = this.findRoute(request.pathName, method);
    if (!route) {
      return HttpResponseHandler.send(
        request,
        response,
        Result.fail(notFound("Rota não encontrada!"))
      );
    }

    const result = await route.handleController({
      body: request?.body,
      params: request?.params,
    });
    return HttpResponseHandler.send(request, response, result);
  }

  private static findRoute(path: string, method: string): Route | undefined {
    const route = this.routes?.find((e) => {
      return e.props.path === path && e.props.method.toUpperCase() === method;
    });

    return route;
  }
}
