import { Aplication } from "@/domain/enums"
import { Http } from "../http/interfaces"


export class BaseStatusToHttpMapper {
  static map(status?: string): number {
    switch (status) {
      case Aplication.Status.OK:
        return Http.StatusCode.OK
      case Aplication.Status.UNAUTHORIZED:
        return Http.StatusCode.UNAUTHORIZED
      case Aplication.Status.NOT_FOUND:
        return Http.StatusCode.NOT_FOUND
      case Aplication.Status.INVALID_REQUEST:
        return Http.StatusCode.BAD_REQUEST
      case Aplication.Status.INTERNAL_ERROR:
        return Http.StatusCode.INTERNAL_SERVER_ERROR
      default:
        return Http.StatusCode.INTERNAL_SERVER_ERROR
    }
  }
}