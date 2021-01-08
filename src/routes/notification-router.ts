import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../error";

import { DomainEventPublisher, DummyDestinationHandler } from '../domain-events';

const domainEventsPublisher = new DomainEventPublisher(new DummyDestinationHandler());

const router: Router = Router();

router.post(
  "/",
  [
    body("text")
      .isString()
      .withMessage("Text body for a notification is required."),
    body("type").isString().withMessage("Type of notification is required."),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    domainEventsPublisher.publish([req.body]);
    res.send(req.body);
  }
);

export { router as NotificationRouter };
