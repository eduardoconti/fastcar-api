import { Result } from "@/domain/contracts"

export interface ControllerRequest<B = any, P = any, A = any> {
  body?: B,
  params?: P,
  atributes?: A
}
export interface IController<Output = any> {
  handle(request?: ControllerRequest): Promise<Result<Output>> | Result<Output>
}
