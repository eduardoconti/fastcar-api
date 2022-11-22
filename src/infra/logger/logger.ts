import { ILogger } from "@/app/interfaces";

const TERMINAL_RED_COLOR = "\x1b[31m%s\x1b[0m";
const TERMINAL_GREEN_COLOR = "\x1b[32m%s\x1b[0m";
const TERMINAL_CYAN_COLOR = "\x1b[36m%s\x1b[0m";
export class Logger implements ILogger {
  constructor(private readonly context?: string) {}
  info(message: string) {
    console.log(
      TERMINAL_GREEN_COLOR,
      `${this.context?.toUpperCase() ?? "INFO"} - ${message}`
    );
  }
  error(message: string): void {
    console.log(
      TERMINAL_RED_COLOR,
      `${this.context?.toUpperCase() ?? "ERROR"} - ${message}`
    );
  }
  system(message: string): void {
    console.log(TERMINAL_CYAN_COLOR, "SYSTEM - " + message);
  }
}
