import { AplicationStatus } from '@domain/enums';
import { BaseException } from '@domain/exceptions';

export class DuplicatedRouteException extends BaseException {
  readonly code = AplicationStatus.INTERNAL_ERROR;

  constructor(metadata?: unknown) {
    super('Duplicated route', metadata);
  }
}
