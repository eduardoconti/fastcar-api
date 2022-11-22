import "./config/module-alias";
import "reflect-metadata";
import * as http from "http";
import {
  CreateUserControllerFactory,
  ListUserControllerFactory,
} from "./factories/controllers/user";
import { Router } from "../infra/http/router/router";
import { OrmClientAdapter } from "../infra/adapters";
import { HealthCheckControllerFactory } from "./factories/controllers/health";
import { Logger } from "@/infra/logger";
import { AuthControllerFactory } from "./factories/controllers/auth";
import { Atributes, Http } from "@/infra/http/interfaces";
import { SendConfirmationEmailToUserEventHandlerFactory } from "./factories/event-handler";
import { ConfirmUserRegistrationControllerFactory } from "./factories/controllers/user";
import { RouterManager } from "@/infra/http/router/router-manager";
import { HealthCheckRouter } from "@/presentation/controllers/health/health-check.router";

const routerManager = new Router();
const orm = new OrmClientAdapter().adapt();
const logger = new Logger();
const createUserController = CreateUserControllerFactory.build(orm);
const listUserController = ListUserControllerFactory.build(orm);
const healthCheckController = HealthCheckControllerFactory.build();
const authController = AuthControllerFactory.build(orm);
const ConfirmUserRegistrationController =
  ConfirmUserRegistrationControllerFactory.build(orm);
//Register domain events handlers
SendConfirmationEmailToUserEventHandlerFactory.build().listen();

//Register routes
routerManager.post({ path: "/login", controller: authController });
routerManager.post({
  path: "/user",
  controller: createUserController,
  auth: "bearer",
});
routerManager.get({
  path: "/user",
  controller: listUserController,
  auth: "bearer",
});
routerManager.get({ path: "/", controller: healthCheckController });
routerManager.get({
  path: "/user/confirm",
  controller: ConfirmUserRegistrationController,
});

const server = http.createServer(
  async (req: Http.Request, res: Http.Response) => {
    req.on("data", (body: any) => {
      Object.assign(req, {
        body: JSON.parse(body),
      });
    });
    const { searchParams, pathname } = parseUrl(req);
    const params: Atributes = {};
    searchParams.forEach((value, param) => {
      params[param] = value;
    });

    Object.assign(req, {
      params,
      pathName: pathname,
    });
    await routerManager.execute(req, res);
  }
);

server.listen(process.env.PORT, () => {
  logger.system(`server started on port: ${process.env.PORT}`);
});

const parseUrl = (request: Http.Request): URL => {
  return new URL(request.url as string, `https://${request.headers["host"]}`);
};
