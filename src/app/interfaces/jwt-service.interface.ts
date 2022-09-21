export interface IJwtService {
  sign<T>(payload: T): Promise<string> | string
  verify(token: string): Promise<boolean> | boolean
}