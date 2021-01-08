import { DestinationHandler } from './index';
import { DomainEvent } from '../domain-event.types';

import em from '../event-emitter';

export class DummyDestinationHandler implements DestinationHandler {
  /**
   * Provides a message delivery mechanism using event emmitter.
   *
   *
   * @param {event} DomainEvent
   *
   * @return {Promise}
   */
  handle(event: DomainEvent) {
    em.emit(event.type, event);
    return true;
  }
}

module.exports = { DummyDestinationHandler };
