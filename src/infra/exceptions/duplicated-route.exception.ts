import { Aplication } from "@domain/enums";
import { BaseException } from "@domain/exceptions";

export class DuplicatedRouteException extends BaseException {
   readonly code = Aplication.Status.INTERNAL_ERROR;

   constructor(metadata?: unknown) {
      super("Duplicated route", metadata);
   }
}
