import { DomainEvent } from "../domain-events/domain-event.types";
import em from "../domain-events/event-emitter";

interface Notification {
  send(data: DomainEvent): Boolean;
}
