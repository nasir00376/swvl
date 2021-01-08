import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../error";

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

    res.send({});
  }
);

export { router as NotificationRouter };
