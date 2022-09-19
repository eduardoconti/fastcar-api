import { Result } from "@/domain/entities"
export interface ControllerRequest {
  body?: Object | String,
  params?: Object,
  atributes?: Object
}
export interface IController<R = any> {
  handle(request?: ControllerRequest): Promise<Result<R>> | Result<R>
}
