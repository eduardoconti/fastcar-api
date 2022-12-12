import "./config/module-alias";
import "reflect-metadata";
import * as http from "http";

import { Atributes, Http } from "@infra/http/interfaces";
import { RouterManager } from "@infra/http/router/router-manager";
import { Logger } from "@infra/logger";
import { AuthRouter } from "@presentation/controllers/auth";
import { HealthCheckRouter } from "@presentation/controllers/health";
import {
   ConfirmUserRegistrationRoute,
   CreateUserRoute,
   ListUserRoute,
} from "@presentation/controllers/user";

import { OrmClientAdapter } from "../infra/adapters";

import { SendConfirmationEmailToUserEventHandlerFactory } from "./factories/event-handler";

const orm = new OrmClientAdapter().adapt();
const logger = new Logger();

// Register domain events handlers
SendConfirmationEmailToUserEventHandlerFactory.build().listen();

// Register routes
HealthCheckRouter.create();
AuthRouter.create({ ormClient: orm });
ConfirmUserRegistrationRoute.create({ ormClient: orm });
CreateUserRoute.create({ ormClient: orm });
ListUserRoute.create({ ormClient: orm });

const server = http.createServer(
   async (req: http.IncomingMessage, res: Http.Response) => {
      await insertBodyInRequest(req);
      insertUrlParamsInRequest(req);
      await RouterManager.execute(req as Http.Request, res);
   },
);

server.listen(process.env.PORT, () => {
   logger.system(`server started on port: ${process.env.PORT}`);
});

const parseUrl = (request: http.IncomingMessage): URL => {
   return new URL(request.url as string, `https://${request.headers.host}`);
};

const insertUrlParamsInRequest = (request: http.IncomingMessage): void => {
   const { searchParams, pathname } = parseUrl(request);
   const params: Atributes = {};
   searchParams.forEach((value, param) => {
      params[param] = value;
   });
   Object.assign(request, {
      params,
      pathName: pathname,
   });
};

const insertBodyInRequest = async (
   request: http.IncomingMessage,
): Promise<void> => {
   await request.on("data", (body: any) => {
      Object.assign(request, {
         body: JSON.parse(body),
      });
   });
};
