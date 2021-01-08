import express from 'express';

import { NotificationRouter } from "./notification-router";

export const routes = (app: express.Application) => {
  app.use('/api/notification', NotificationRouter)
};
