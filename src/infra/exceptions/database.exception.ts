import { Aplication } from "@/domain/enums";
import { BaseException } from "@/domain/exceptions";

export class DataBaseException extends BaseException {
   readonly code = Aplication.Status.INTERNAL_ERROR;

   constructor(metadata?: unknown) {
      super("Database error", metadata);
   }
}
