import { BaseStatusToHttpMapper } from "./base-status-to-http.mapper";

import { BaseException } from "@/domain/exceptions";

export class BaseErrorToProblemDetailsMapper {
   static map(baseError: BaseException) {
      const errorProps = baseError.toJSON();
      return {
         status: BaseStatusToHttpMapper.map(errorProps.code),
         title: baseError.constructor.name,
         detail: errorProps.message,
         type: "about:blank",
      };
   }
}
