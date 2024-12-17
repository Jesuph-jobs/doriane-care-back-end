import { Router } from 'express';

import { createGuestOrder, deleteOrders, getOrderById, getOrders, updateOrderState } from '@server/handlers/orders';
// import { validateRequest } from '@server/utils/httpHandlers';

const ordersRouter = Router();

ordersRouter.route('/').get(getOrders).post(createGuestOrder).delete(deleteOrders);
ordersRouter.route('/:orderId/state').put(updateOrderState);
ordersRouter.route('/:orderId').get(getOrderById);

export default ordersRouter;
