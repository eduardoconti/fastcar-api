import { IController } from "@app/interfaces";
import { Guard, Result } from "@domain/contracts";
import { BaseException } from "@domain/exceptions";
import {
   ExecuteMiddlewareException,
   HandleControllerException,
   InvalidRouteException,
} from "@infra/exceptions";

import {
   Atributes,
   HttpAuthenticationType,
   HttpMethods,
   HttpRequest,
   HttpResponse,
   IMiddleware,
} from "../interfaces";

import { RouterManager } from "./router-manager";

export type CreateRouteProps = {
   path: string;
   method: HttpMethods;
   controller: IController;
   auth?: HttpAuthenticationType;
   middlewares?: IMiddleware[];
};
export abstract class Route {
   protected abstract _controller: IController;

   protected _method!: string;

   protected _regex!: RegExp;

   protected _path!: string;

   protected _authenticationType?: string;

   protected _atributes?: string[];

   protected _middlewares?: IMiddleware[];

   constructor(props: CreateRouteProps) {
      this.validate(props);
      this._method = props.method;
      this._authenticationType = props.auth;
      this._path = props.path;
      this._middlewares = props.middlewares;
      this._atributes = [];
      this.setControler(props.controller);
      this.buildRegexToMatchRoute(props.path);
      RouterManager.register(this);
   }

   async executeMiddlewares(
      req: HttpRequest,
      res: HttpResponse,
   ): Promise<Result<any>> {
      if (!this._middlewares) {
         return Result.ok();
      }

      try {
         const results = await Promise.all(
            this._middlewares?.map(e => {
               const result = e.execute(req, res);
               return result;
            }),
         );
         return Result.combine(results);
      } catch (error: any) {
         if (error instanceof BaseException) {
            return Result.fail(error);
         }
         return Result.fail(new ExecuteMiddlewareException(error));
      }
   }

   async handleController(req: HttpRequest): Promise<Result> {
      try {
         return await this._controller.handle({
            body: req?.body,
            params: req?.params,
            atributes: this.extractAtributesFromPath(req.pathName as string),
         });
      } catch (error: any) {
         if (error instanceof BaseException) {
            return Result.fail(error);
         }

         return Result.fail(new HandleControllerException(error));
      }
   }

   get method(): string {
      return this._method;
   }

   get path(): string {
      return this._path;
   }

   get authenticationType(): string | undefined {
      return this._authenticationType;
   }

   get regex(): RegExp {
      return this._regex;
   }

   get atributes(): string[] | undefined {
      return this._atributes;
   }

   private extractAtributesFromPath(urlPath: string): Atributes | undefined {
      const regexResult = this._regex.exec(urlPath);
      if (!regexResult) return;
      const atributes: Atributes = {};
      this?._atributes?.forEach((atribute, i) => {
         atributes[atribute] = regexResult[i + 1];
      });
      return atributes;
   }

   private setControler(controller: IController) {
      this._controller = controller;
   }

   private validate(props: CreateRouteProps) {
      const { path } = props;
      if (
         !Guard.isEmpty(
            path.match(/^\/|[0-9]|[$%?!@()-+*\\]|[/]{2,}|[^\w]$|[:]{2,}/g),
         )
      ) {
         throw new InvalidRouteException({
            route: this.constructor.name,
            path,
         });
      }
   }

   private buildRegexToMatchRoute(path: string) {
      const arrayPath = path.split("/");
      let result = "";
      arrayPath.forEach((pathName, i) => {
         if (!Guard.isEmpty(pathName.match(/^:/g))) {
            result += "([a-zA-Z0-9-]+)";
            this._atributes?.push(pathName.replace(":", ""));
         } else {
            result += `${pathName}\\b`;
         }
         if (i < arrayPath.length - 1) result += "/";
      });
      this._regex = new RegExp(`${result}$`, "gm");
   }
}
