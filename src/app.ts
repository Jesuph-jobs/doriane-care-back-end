import fs from 'node:fs';
import { FY_CORS_ORIGIN, FY_PUBLIC_CASH_AGE, FY_PUBLIC_DIR, isDev, isProd, isTest } from '@server/config/env';
import { defaultErrorRequestHandler, unexpectedRequest } from '@server/middleware/errorHandler';
import rateLimiter from '@server/middleware/rateLimiter';
import openAPIRouter from '@server/router/v1/openAPI.router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import type { ERequest } from '!server/E_Express';

import Routing from './router/v1';
//import Routing1_1 from './router/v1.1';

const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);
// Set the public directory
if (!fs.existsSync(FY_PUBLIC_DIR)) {
	fs.mkdirSync(FY_PUBLIC_DIR);
}
app.use(
	'/public',
	express.static(FY_PUBLIC_DIR, {
		maxAge: FY_PUBLIC_CASH_AGE,
	})
);
// Middlewares
app.use(cors({ origin: new RegExp(FY_CORS_ORIGIN), credentials: true }));
app.use(helmet());
if (isDev || isTest) {
	app.use(morgan('dev'));
	// Swagger UI
	app.use('/docs', openAPIRouter);
}
if (isProd || isTest) app.use(rateLimiter);

// Route the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req: ERequest, _res, next) => {
	req.records = { user: null, website: null };
	next();
});
app.use('/api/v1', Routing);
//app.use('/api/v1.1', Routing1_1);

app.use(unexpectedRequest);
// Error handlers
app.use(defaultErrorRequestHandler);

export default app;
