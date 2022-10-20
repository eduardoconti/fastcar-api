
import { Aplication } from '../enums';
import { BaseException } from './base.exception';

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends BaseException {
  readonly code = Aplication.Status.INTERNAL_ERROR
}