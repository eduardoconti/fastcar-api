import { IController } from "@/app/interfaces";
import { Guard, Result } from "@/domain/contracts";
import { BaseException } from "@/domain/exceptions";
import {
  HandleControllerException,
  InvalidRouteException,
} from "@/infra/exceptions";
import { Atributes, Http } from "../interfaces";
import { RouterManager } from "./router-manager";

export type RouteProps = {
  path: string;
  method: Http.Methods;
  auth?: Http.AuthenticationType;
};

export type CreateRouteProps = {
  path: string;
  method: Http.Methods;
  controller: IController;
  auth?: Http.AuthenticationType;
};
export abstract class Route {
  protected abstract _controller: IController;
  protected _method!: string;
  protected _authenticationType?: string;
  protected _regex!: RegExp;
  protected _path!: string;
  protected _atributes?: string[];

  constructor(props: CreateRouteProps) {
    this.validate(props);
    this._method = props.method;
    this._authenticationType = props.auth;
    this._path = props.path;
    this.setControler(props.controller);
    this.buildRegexToMatchRoute(props.path);
    RouterManager.register(this);
  }

  private setControler(controller: IController) {
    this._controller = controller;
  }

  private validate(props: RouteProps) {
    const { path } = props;
    if (!Guard.isEmpty(path.match(/^\/|[0-9]|[$%?!@()-+*\\]/g))) {
      throw new InvalidRouteException({
        route: this.constructor.name,
        path,
      });
    }
  }

  async handleController(req: Http.Request): Promise<Result> {
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

  private buildRegexToMatchRoute(path: string) {
    const arrayPath = path.split("/");
    let result = "";
    let quantityAtributes = 0;
    arrayPath.forEach((e, i) => {
      if (!Guard.isEmpty(e.match(/^:/g))) {
        result += `(.*)`;
        quantityAtributes++;
      } else {
        result += `${e}\\b`;
      }
      if (i < arrayPath.length - 1) result += `\/`;
    });
    this._regex = new RegExp(result, "gm");
    if (quantityAtributes > 0) {
      this._atributes = path
        .replace(this._regex, this.replaceValue(quantityAtributes))
        .split(",")
        .map((e) => e.replace(":", ""));
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

  private extractAtributesFromPath(urlPath: string): Atributes | undefined {
    const regexResult = this._regex.exec(urlPath);
    if (!regexResult) return;
    let atributes: Atributes = {};
    this?._atributes?.forEach((e, i) => {
      atributes[e] = regexResult[i + 1];
    });
    return atributes;
  }

  private replaceValue(quantity: number): string {
    let replace = "";
    for (let i = 1; i <= quantity; i++) {
      replace += `$${i}`;
      if (i < quantity) replace += ",";
    }
    return replace;
  }
}
