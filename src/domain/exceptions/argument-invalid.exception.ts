import { AplicationStatus } from "../enums";

import { BaseException } from "./base.exception";

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentInvalidException
 * @extends {BaseException}
 */
export class ArgumentInvalidException extends BaseException {
   readonly code = AplicationStatus.INTERNAL_ERROR;
}
