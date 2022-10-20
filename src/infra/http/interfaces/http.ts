import * as http from "http"
export namespace Http {
  export type Request = http.IncomingMessage & { body?: any, params?: URLSearchParams }
  export type Response = http.ServerResponse
  export type AuthenticationType = 'bearer'
  export type Methods = 'POST' | 'GET' | 'PUT' | 'DELETE'
  export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
  }
}