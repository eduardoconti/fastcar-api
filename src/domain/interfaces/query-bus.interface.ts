import { IQueryHandler } from "./query-hrandler.interface";
import { IQuery } from "./query.interface";

export interface IQueryBus<BaseQuery extends IQuery = IQuery> {
   registerHandler(queryHandler: IQueryHandler<BaseQuery>): void;
   execute<T extends BaseQuery = BaseQuery, R = any>(query: T): Promise<R>;
}