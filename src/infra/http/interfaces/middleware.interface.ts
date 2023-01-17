import { Result } from '@domain/contracts';

import { HttpRequest, HttpResponse } from './http';

export interface IMiddleware {
  execute(req: HttpRequest, res: HttpResponse): Promise<Result>;
}
