import { Router } from 'express';

import { checkConfiguration, isLoggedInAndWebsite } from '@server/middleware/auth';
import adminsRouter from './admins.router';
import authRouter from './auth/router';
import blogsRouter from './blogs.router';
import categoriesRouter from './categories.router';
import collectionsRouter from './collections.router';
import customersRouter from './customers.router';
import uploadRouter from './files/router';
import healthCheckRouter from './healthCheck/router';
import ordersRouter from './orders.router';
import productsRouter from './products.router';
import profileRouter from './profile/router';
import reviewsRouter from './reviews.router';

const v1Router = Router();
// Routes
v1Router.use('/health-check', healthCheckRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/upload', uploadRouter);
v1Router.use('/profile', profileRouter);
v1Router.use(checkConfiguration, isLoggedInAndWebsite);
v1Router.use('/products', productsRouter);
v1Router.use('/customers', customersRouter);
v1Router.use('/admins', adminsRouter);
v1Router.use('/reviews', reviewsRouter);
v1Router.use('/orders', ordersRouter);
v1Router.use('/blogs', blogsRouter);
v1Router.use('/categories', categoriesRouter);
v1Router.use('/collections', collectionsRouter);
export default v1Router;
