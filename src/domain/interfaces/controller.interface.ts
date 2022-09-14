export interface IController {
  handle: (request: any) => Promise<any>
}

export interface IHttpRequest {
  path: string,
  method: string,
  data: any
}