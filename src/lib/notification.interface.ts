import { DomainEvent } from "../domain-events/domain-event.types";

export interface INotification {

  send(data: DomainEvent): Boolean;
}
