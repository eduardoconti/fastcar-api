import { AplicationError } from "@/domain/enums"
import { Http } from "../http/interfaces"


export class BaseStatusToHttpMapper {
  static map(status?: string): number {
    switch (status) {
      case AplicationError.Status.OK:
        return Http.StatusCode.OK
      case AplicationError.Status.UNAUTHORIZED:
        return Http.StatusCode.UNAUTHORIZED
      case AplicationError.Status.NOT_FOUND:
        return Http.StatusCode.NOT_FOUND
      case AplicationError.Status.INVALID_REQUEST:
        return Http.StatusCode.BAD_REQUEST
      case AplicationError.Status.INTERNAL_ERROR:
        return Http.StatusCode.INTERNAL_SERVER_ERROR
      default:
        return Http.StatusCode.INTERNAL_SERVER_ERROR
    }
  }
}