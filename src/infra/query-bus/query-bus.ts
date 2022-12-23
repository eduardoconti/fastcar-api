import { IQuery, IQueryBus, IQueryHandler } from "@domain/interfaces";

export class QueryBus<BaseQuery extends IQuery = IQuery> implements IQueryBus<BaseQuery> {
   public handlers: Map<string, IQueryHandler<BaseQuery>> = new Map();

   public registerHandler(handler: IQueryHandler<BaseQuery>) {
      const queryName = handler.queryToHandle;
      if (this.handlers.has(queryName)) {
         return;
      }
      this.handlers.set(queryName, handler);
   }

   public async execute<T extends BaseQuery = BaseQuery, R = any>(query: T) {
      if (this.handlers.has(query.constructor.name)) {
         return (this.handlers.get(query.constructor.name) as IQueryHandler<BaseQuery>).execute(query);
      }
   }
}