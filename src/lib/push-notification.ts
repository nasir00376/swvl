import Debug, { IDebugger } from "debug";
import { DomainEvent } from "../domain-events/domain-event.types";
import { INotification } from "./notification.interface";

const debug: IDebugger = Debug("notification:Push");

export class PushNotification implements INotification {
    send(data: DomainEvent): Boolean {
        debug("Sending Push notification with data %s", data);

        return true;
    }

}