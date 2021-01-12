import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../error";

import { DomainEventPublisher, DummyDestinationHandler } from '../domain-events';
import { Notification } from '../models/notification.model';

const domainEventsPublisher = new DomainEventPublisher(new DummyDestinationHandler());

const router: Router = Router();

router.post(
  "/",
  [
    body("text")
      .isString()
      .withMessage("Text body for a notification is required."),
    body("type").isString().withMessage("Type of notification is required."),
    body("notificationType").isString().withMessage("notificationType is required."),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { type, text, notificationType } = req.body;

    const notification = Notification.build({
      type,
      text,
      notificationType
    });

    // To save in db: Uncomment

    // await notification.save();

    domainEventsPublisher.publish([{ eventType: 'created', ...req.body }]);
    res.send(notification);
  }
);

export { router as NotificationRouter };
