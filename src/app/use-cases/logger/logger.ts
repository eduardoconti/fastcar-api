import { ILogger } from "@/domain/interfaces";

export class Logger implements ILogger {
  info(message: string) {
    console.log("\x1b[32m%s\x1b[0m", { level: 'info', message })
  }
  error(message: string): void {
    console.log("\x1b[31m%s\x1b[0m", { level: 'error', message })
  }
}