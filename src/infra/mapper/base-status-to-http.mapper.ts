import { AplicationStatus } from '@domain/enums';
import { HttpStatusCode } from '@infra/http/interfaces';

export class BaseStatusToHttpMapper {
  static map(status?: string): number {
    switch (status) {
      case AplicationStatus.OK:
        return HttpStatusCode.OK;
      case AplicationStatus.UNAUTHORIZED:
        return HttpStatusCode.UNAUTHORIZED;
      case AplicationStatus.NOT_FOUND:
        return HttpStatusCode.NOT_FOUND;
      case AplicationStatus.INVALID_REQUEST:
        return HttpStatusCode.BAD_REQUEST;
      case AplicationStatus.INTERNAL_ERROR:
        return HttpStatusCode.INTERNAL_SERVER_ERROR;
      default:
        return HttpStatusCode.INTERNAL_SERVER_ERROR;
    }
  }
}
