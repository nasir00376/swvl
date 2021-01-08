import Debug from "debug";
import em from "./event-emitter";

const debug: Debug.IDebugger = Debug("notification:DomainEvents:listener");

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
    em.on("created", (event) => {
      debug("Started to listen domain event with type: %s", event.type);
    });
  }
}
