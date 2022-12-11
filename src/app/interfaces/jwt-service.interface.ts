export interface IJwtService {
   sign<T = any>(payload: T): Promise<string> | string;
   verify(token: string): Promise<boolean> | boolean;
}
