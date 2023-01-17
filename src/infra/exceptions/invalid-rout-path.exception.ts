import { AplicationStatus } from '@domain/enums';
import { BaseException } from '@domain/exceptions';

export class InvalidRouteException extends BaseException {
  readonly code = AplicationStatus.INTERNAL_ERROR;

  constructor(metadata?: unknown) {
    super('Invalid route path', metadata);
  }
}
