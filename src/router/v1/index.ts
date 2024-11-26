import { Router } from 'express';

import { checkConfiguration, isLoggedInAndWebsite } from '@server/middleware/auth';
import authRouter from './auth/router';
import filesRouter from './files/router';
import healthCheckRouter from './healthCheck/router';
import productsRouter from './products/router';
import profileRouter from './profile/router';

const v1Router = Router();
// Routes
v1Router.use('/health-check', healthCheckRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/files', filesRouter);
v1Router.use('/profile', profileRouter);
v1Router.use(checkConfiguration, isLoggedInAndWebsite);
v1Router.use('/products', productsRouter);
export default v1Router;
