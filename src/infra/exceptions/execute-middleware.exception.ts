import { AplicationStatus } from "@domain/enums";
import { BaseException } from "@domain/exceptions";

export class ExecuteMiddlewareException extends BaseException {
   readonly code = AplicationStatus.INTERNAL_ERROR;

   constructor(metadata?: unknown) {
      super("ExecuteMiddlewareError", metadata);
   }
}
