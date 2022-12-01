import { Result } from "@/domain/contracts";
import { Http } from "./http";

export interface IMiddleware {
  execute(req: Http.Request, res: Http.Response): Promise<Result>;
}
