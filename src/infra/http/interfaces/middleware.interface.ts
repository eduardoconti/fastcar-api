import { Http } from "./http";

import { Result } from "@/domain/contracts";

export interface IMiddleware {
   execute(req: Http.Request, res: Http.Response): Promise<Result>;
}
