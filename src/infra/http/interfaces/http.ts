import * as http from "http";

import { Atributes } from "./router.interface";

export type HttpRequest = http.IncomingMessage & {
   body?: any;
   params?: Atributes;
   pathName: string;
};
export type HttpResponse = http.ServerResponse;
export type HttpAuthenticationType = "bearer";
export type HttpMethods = "POST" | "GET" | "PUT" | "DELETE";
export enum HttpStatusCode {
   OK = 200,
   CREATED = 201,
   NO_CONTENT = 204,
   BAD_REQUEST = 400,
   UNAUTHORIZED = 401,
   NOT_FOUND = 404,
   INTERNAL_SERVER_ERROR = 500,
}
