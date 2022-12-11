import { Http } from "../interfaces";

import { HttpResponseHandler } from "./http-response-handler";
import { Route } from "./route";

import { notFound, unauthorized } from "@/app/errors";
import { IJwtService, ILogger } from "@/app/interfaces";
import { Result } from "@/domain/contracts";
import { BaseException } from "@/domain/exceptions";
import { JwtAdapter } from "@/infra/adapters";
import {
   DuplicatedRouteException,
   ExecuteMiddlewareException,
} from "@/infra/exceptions";
import { Logger } from "@/infra/logger";

export class RouterManager {
   private static routes: Route[] = [];

   private static logger: ILogger = new Logger("RouterManager");

   private static jwtService: IJwtService = new JwtAdapter().adapt();

   static register(route: Route) {
      if (
         this.routes.find(e => {
            return e.method === route.method && e.path === route.path;
         })
      ) {
         throw new DuplicatedRouteException(route);
      }
      this.routes.push(route);
      this.logger.system(`route: ${route.method} ${route.path} | ${route.regex}`);
   }

   static async execute(request: Http.Request, response: Http.Response) {
      const method = request.method as Http.Methods;
      const route = this.findRoute(request.pathName, method);
      if (!route) {
         return HttpResponseHandler.send(
            request,
            response,
            Result.fail(notFound("Rout not found!")),
         );
      }
      const accessResult = this.verifyAccessControl(route, request);
      if (accessResult.isFailure)
         return HttpResponseHandler.send(request, response, accessResult);

      try {
         const resultMiddlewares = await route.executeMiddlewares(
            request,
            response,
         );
         if (resultMiddlewares) {
            const combine = Result.combine(resultMiddlewares);
            if (combine.isFailure)
               return HttpResponseHandler.send(request, response, combine);
         }
      } catch (error: any) {
         if (error instanceof BaseException) {
            return HttpResponseHandler.send(request, response, Result.fail(error));
         }
         return HttpResponseHandler.send(
            request,
            response,
            Result.fail(new ExecuteMiddlewareException(error)),
         );
      }

      const result = await route.handleController(request);
      return HttpResponseHandler.send(request, response, result);
   }

   private static findRoute(path: string, method: string): Route | undefined {
      const route = this.routes?.find(route => {
         return route.method.toUpperCase() === method && path.match(route.regex);
      });

      return route;
   }

   private static verifyAccessControl(
      route: Route,
      request: Http.Request,
   ): Result {
      if (route?.authenticationType) {
         if (!request.headers.authorization) {
            return Result.fail(unauthorized("Token not found!"));
         }
         const splitToken = request?.headers.authorization?.split(" ");
         if (splitToken[0] !== "Bearer" || !splitToken[1]) {
            return Result.fail(unauthorized("Invalid token!"));
         }

         if (!this.jwtService.verify(splitToken[1]))
            return Result.fail(unauthorized("Authentication failed!"));
      }
      return Result.ok();
   }

   static clearRoutes() {
      this.routes = [];
   }
}
