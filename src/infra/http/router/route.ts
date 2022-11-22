import { ControllerRequest, IController } from "@/app/interfaces";
import { Result } from "@/domain/contracts";
import { InvalidRouteException } from "@/infra/exceptions";
import { Atributes, Http } from "../interfaces";
import { RouterManager } from "./router-manager";

export type RouteProps = {
  path: string;
  method: Http.Methods;
  middleware?: any[];
  auth?: "bearer";
  atributes?: Atributes;
};
export abstract class Route {
  protected abstract _controller: IController;
  readonly props: RouteProps;

  constructor(props: RouteProps & { controller: IController }) {
    this.validate(props);
    this.props = props;
    this.setControler(props.controller);
    RouterManager.register(this)
  }

  private setControler(controller: IController) {
    this._controller = controller;
  }

  private validate(props: RouteProps) {
    const { path } = props;
    if (!path.match(/^[/]/g)) {
      throw new InvalidRouteException();
    }
    // const regex = /([a-z]\w+([/][:])[a-z])\w+/g;
    // const regexResult = path.match(regex) as string[];
    // let atributes: Atributes = {};
    // if (!Guard.isEmpty(regexResult))
    //   regexResult.forEach((value) => {
    //     const split = value.split("/:");
    //     atributes[split[0]] = split[1];
    //   });
  }

  async handleController(
    controllerRequest: ControllerRequest
  ): Promise<Result<any>> {
    return await this._controller.handle(controllerRequest);
  }
}
