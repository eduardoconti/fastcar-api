import { AplicationStatus } from "@domain/enums";
import { BaseException } from "@domain/exceptions";

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class InvalidRequestBodyException
 * @extends {ExceptionBase}
 */
export class InvalidRequestBodyException extends BaseException {
   readonly code = AplicationStatus.INVALID_REQUEST;
}
