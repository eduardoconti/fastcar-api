export interface ILogger {
   info(message: string): void;
   error(message: string): void;
   system(message: string): void;
}
