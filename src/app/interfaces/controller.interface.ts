import { Result } from "@/domain/entities"
export interface ControllerRequest<B = any, P = any, A = any> {
  body?: B,
  params?: P,
  atributes?: A
}
export interface IController<R = any> {
  handle(request?: ControllerRequest): Promise<Result<R>> | Result<R>
}
