import { Router } from 'express';

import {
	createCustomer,
	deleteCustomers,
	getBaseCustomers,
	getCustomerById,
	getCustomers,
	getGuests,
	updateCustomerState,
} from '@server/handlers/customers';

const customersRouter = Router();

customersRouter.route('/').get(getBaseCustomers).post(createCustomer).delete(deleteCustomers);
customersRouter.route('/customers').get(getCustomers);
customersRouter.route('/guests').get(getGuests);
customersRouter.route('/:customerId/state').put(updateCustomerState);
customersRouter.route('/:customerId').get(getCustomerById);

export default customersRouter;