import Debug from 'debug';

import express from 'express';
import 'express-async-errors';

import * as dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import { connectDB } from './config/db';
import { routes } from './routes';
import { NotFoundError } from './error';
import { errorHandler } from './middlewares/error.handler';
import { DomainEventListener } from './domain-events';

dotenv.config();
// Listen for domain events
DomainEventListener.listen();

const debug: Debug.IDebugger = Debug('notification:app');

const PORT = parseInt(<string>process.env.PORT) || 5454;
const app: express.Application = express();
// Database connection
connectDB()
    .catch((error: Error) => debug('Error while db connection', error.message));

// Middlewares
app.use(json());
app.use(urlencoded({ extended: false }));
// Use routes as middlewares
routes(app);


app.all('*', async (req, res) => {
  throw new NotFoundError('Route not found.');
});

app.use(errorHandler);


app.listen(PORT, () => debug(`Server is listening on ${PORT}`));