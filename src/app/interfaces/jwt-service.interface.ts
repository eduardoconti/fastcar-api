export interface IJwtService {
   sign<T  extends object >(payload: T): Promise<string> | string;
   verify(token: string): Promise<boolean> | boolean;
}
