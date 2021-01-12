import Debug from 'debug';

import { DomainEvent } from './domain-event.types';
import { DestinationHandler } from './destinationHandlers';

const debug: Debug.IDebugger = Debug("notification:DomainEvents:publisher");

/**
 * Class that represents Event Publisher.
 */
export class DomainEventPublisher {
  /**
   * Generates a new publisher instance.
   *
   * @param {Object} destinationHandler - Destination handler for domain events publishing.
   */

   private destinationHandler: DestinationHandler;

  constructor(destinationHandler: DestinationHandler) {
    if (!destinationHandler) {
      throw new Error("Missing destination handler");
    }
    this.destinationHandler = destinationHandler;
  }

  /**
   * Forwards outgoing domain events to an appropriate destination.
   *
   * @param {DomainEvent[]} events - Collection of domain events.
   *
   * @return {Boolean} - True when all events have successfully
   *   reached the destination.
   */
   publish(events: DomainEvent[]) {
    return events
      .map(async event => {
        debug("Started processing event");
        const result =  this.destinationHandler.handle(event);
        if (!result) {
          debug("Failed to publish domain event with type: %s", event.eventType);
          throw new Error("Failed to publish domain events collection");
        }
        debug("Successfully published event with type: %s", event.eventType);
        return true;
      });
  }
}
