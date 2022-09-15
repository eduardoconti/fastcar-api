import { Result } from "@/domain/entities"
import * as http from "http"
export type HttpRequest = http.IncomingMessage & { body?: any }
export type HttpResponse = http.ServerResponse
export type ControllerRequest<B = any, P = any, A = any> = {
  body?: B,
  params?: P,
  atributes?: A
}
export interface IController {
  handle<B, P, A>(request: ControllerRequest<B, P, A>): Promise<Result<any>>
}
