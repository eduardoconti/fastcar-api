import { Aplication } from "@/domain/enums";
import { BaseException } from "@/domain/exceptions";

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class BadRequestException
 * @extends {ExceptionBase}
 */
export class BadRequestException extends BaseException {
  readonly code = Aplication.Status.INVALID_REQUEST;
}
