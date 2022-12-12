import { Aplication } from "@domain/enums";
import { BaseException } from "@domain/exceptions";

export class ExecuteMiddlewareException extends BaseException {
   readonly code = Aplication.Status.INTERNAL_ERROR;

   constructor(metadata?: unknown) {
      super("ExecuteMiddlewareError", metadata);
   }
}
