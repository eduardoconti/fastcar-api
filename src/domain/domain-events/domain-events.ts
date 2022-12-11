/* eslint-disable no-param-reassign */
import { AggregateRoot } from "../contracts";
import { ID } from "../value-objects/id.value-object";

import { DomainEventHandler } from "./domain-event-handler";
import { DomainEvent } from "./domain-event.base";

type EventName = string;

export type DomainEventClass = new (...args: never[]) => DomainEvent;

export class DomainEvents {
   private static subscribers: Map<EventName, DomainEventHandler[]> = new Map();

   private static aggregates: AggregateRoot<unknown>[] = [];

   public static subscribe<T extends DomainEventHandler>(
      event: DomainEventClass,
      eventHandler: T,
   ): void {
      const eventName: EventName = event.name;
      if (!this.subscribers.has(eventName)) {
         this.subscribers.set(eventName, []);
      }
      this.subscribers.get(eventName)?.push(eventHandler);
   }

   public static prepareForPublish(aggregate: AggregateRoot<unknown>): void {
      const aggregateFound = !!this.findAggregateByID(aggregate.id);
      if (!aggregateFound) {
         this.aggregates.push(aggregate);
      }
   }

   public static async publishEvents(
      id: ID,
      correlationId?: string,
   ): Promise<void> {
      const aggregate = this.findAggregateByID(id);

      if (aggregate) {
         await Promise.all(
            aggregate.domainEvents.map((event: DomainEvent) => {
               if (correlationId && !event.correlationId) {
                  event.correlationId = correlationId;
               }
               return this.publish(event);
            }),
         );
         aggregate.clearEvents();
         this.removeAggregateFromPublishList(aggregate);
      }
   }

   private static findAggregateByID(id: ID): AggregateRoot<unknown> | undefined {
      for (const aggregate of this.aggregates) {
         if (aggregate.id.equals(id)) {
            return aggregate;
         }
      }
   }

   private static removeAggregateFromPublishList(
      aggregate: AggregateRoot<unknown>,
   ): void {
      const index = this.aggregates.findIndex(a => a.equals(aggregate));
      this.aggregates.splice(index, 1);
   }

   private static async publish(event: DomainEvent): Promise<void> {
      const eventName: string = event.constructor.name;

      if (this.subscribers.has(eventName)) {
         const handlers: DomainEventHandler[] =
        this.subscribers.get(eventName) || [];
         await Promise.all(
            handlers.map(handler => {
               return handler.handle(event);
            }),
         );
      }
   }
}
