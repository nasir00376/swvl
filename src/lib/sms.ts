import Debug, { IDebugger } from "debug";
import { DomainEvent } from "../domain-events/domain-event.types";
import { INotification } from "./notification.interface";

const debug: IDebugger = Debug("notification:SMS");

export class SMS implements INotification {
  send(data: DomainEvent): Boolean {
    debug("Sending SMS with data %s:", data);

    return true;
  }
}
