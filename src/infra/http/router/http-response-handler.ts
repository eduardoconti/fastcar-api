import { Http } from "../interfaces";

import { ILogger } from "@/app/interfaces";
import { Guard, Result } from "@/domain/contracts";
import { BaseException } from "@/domain/exceptions";
import { Logger } from "@/infra/logger";
import {
   BaseErrorToProblemDetailsMapper,
   BaseStatusToHttpMapper,
} from "@/infra/mapper";

export class HttpResponseHandler {
   private static logger: ILogger = new Logger("HttpResponseHandler");

   static send(request: Http.Request, response: Http.Response, result: Result) {
      if (result.isSuccess) {
         let statusCode = Http.StatusCode.OK;
         if (request.method === "POST") statusCode = Http.StatusCode.CREATED;
         if (request.method === "GET" && Guard.isEmpty(result.getValue()))
            statusCode = Http.StatusCode.NO_CONTENT;

         response.writeHead(statusCode, { "Content-Type": "application/json" });
         if (statusCode !== Http.StatusCode.NO_CONTENT) {
            response.write(JSON.stringify(result.getValue()));
         }
         this.logger.info(
            JSON.stringify({
               url: request.url,
               body: request?.body,
               headers: request.headers,
               response: result.getValue(),
            }),
         );
      } else {
         const statusCode = BaseStatusToHttpMapper.map(result.error?.code);
         response.writeHead(statusCode, {
            "Content-Type": "application/problem+json",
         });
         response.write(
            JSON.stringify(
               BaseErrorToProblemDetailsMapper.map(result.error as BaseException),
            ),
         );
         this.logger.error(
            JSON.stringify({
               url: request.url,
               body: request?.body,
               headers: request.headers,
               response: result?.error,
            }),
         );
      }

      response.end();
   }
}
