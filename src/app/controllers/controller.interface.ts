import { Result } from "@/domain/entities"
import * as http from "http"
export type HttpRequest = http.IncomingMessage & { body?: any }
export type HttpResponse = http.ServerResponse
export interface ControllerRequest {
  body?: Object | String,
  params?: Object,
  atributes?: Object
}
export interface IController<R = any> {
  handle(request?: ControllerRequest): Promise<Result<R>> | Result<R>
}
