import { BaseError } from "@/domain/entities";
import { BaseStatusToHttpMapper } from "./base-status-to-http.mapper";

export class BaseErrorToProblemDetailsMapper {
  static map(baseError: BaseError) {
    const { status, title, detail, type = 'about:blank' } = baseError
    return {
      status: BaseStatusToHttpMapper.map(status),
      title,
      detail,
      type,
    }
  }


}