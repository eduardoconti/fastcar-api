import * as http from "http"
export namespace Http {
  export type Request = http.IncomingMessage & { body?: any, params?: URLSearchParams }
  export type Response = http.ServerResponse
  export type AuthenticationType = 'bearer'
  export type Methods = 'POST' | 'GET' | 'PUT' | 'DELETE'
}