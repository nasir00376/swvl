import { DomainEvent } from '../domain-event.types';

export interface DestinationHandler {
  handle(domainEvent: DomainEvent): Boolean
}