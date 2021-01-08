import { json, urlencoded } from 'body-parser';
import Debug from 'debug';
import express from 'express';

import * as dotenv from 'dotenv';

dotenv.config();

import { connectDB } from './config/db';

// import { routes } from './routes';

const debug: Debug.IDebugger = Debug('notification:app');

const PORT = parseInt(<string>process.env.PORT) || 5454;
const app: express.Application = express();
// Database connection
// connectDB()
//     .catch((error: Error) => debug('Error while db connection', error.message));

// Middlewares
app.use(json());
app.use(urlencoded({ extended: false }));
// Use routes as middlewares
// routes(app);

app.listen(PORT, () => debug(`Server is listening on ${PORT}`));