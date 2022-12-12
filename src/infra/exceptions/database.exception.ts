import { AplicationStatus } from "@domain/enums";
import { BaseException } from "@domain/exceptions";

export class DataBaseException extends BaseException {
   readonly code = AplicationStatus.INTERNAL_ERROR;

   constructor(metadata?: unknown) {
      super("Database error", metadata);
   }
}
