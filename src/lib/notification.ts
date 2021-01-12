import { DomainEvent } from "../domain-events/domain-event.types";
import { INotification } from "./notification.interface";

export class Notification implements INotification {
  constructor(private currentNotification: INotification) {}

  send(data: DomainEvent): Boolean {
    return this.currentNotification.send(data);
  }
}
