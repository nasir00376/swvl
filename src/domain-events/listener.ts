import Debug from "debug";
import { DomainEvent } from "./domain-event.types";
import em from "./event-emitter";
import { SMS } from '../lib/sms';
import { PushNotification } from "../lib/push-notification";
import { INotification } from "../lib/notification.interface";
import { Notification } from "../lib/notification";

const debug: Debug.IDebugger = Debug("notification:DomainEvents:listener");

interface NotificationTypes {
  sms: typeof SMS;
  push: typeof PushNotification;
}

const notificationTypes: NotificationTypes = {
  sms: SMS,
  push: PushNotification
}

/**
 * Class that represents Event Listener.
 */
export class DomainEventListener {
  /**
   * Receives incomming domain events.
   *
   * @param {DomainEvent[]} events - Collection of domain events.
   *
   */
  static listen() {
    em.on("created", (domaainEvent: DomainEvent) => {
      const { notificationType, eventType } = domaainEvent;
      debug("Started to listen domain event with type: %s", eventType);
      const CurrentNotification = notificationTypes[notificationType];

      if(!CurrentNotification) {
        debug("Invalid notification type is provided: %s", notificationType);
        throw new Error(`Notification of type ${notificationType} is not supported.`)
      }

      const notification = new Notification(new CurrentNotification());

      notification.send(domaainEvent);


    });
  }
}
