import { AplicationStatus } from '@domain/enums';
import { BaseException } from '@domain/exceptions';

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class UnauthorizedException
 * @extends {ExceptionBase}
 */
export class UnauthorizedException extends BaseException {
  readonly code = AplicationStatus.UNAUTHORIZED;
}
