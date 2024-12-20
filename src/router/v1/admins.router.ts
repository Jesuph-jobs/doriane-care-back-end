import { Router } from 'express';

import {
	createAdmin,
	deleteAdmins,
	getAdminById,
	getAdmins,
	updateAdmin,
	updateAdminState,
} from '@server/handlers/admins';

const adminsRouter = Router();

adminsRouter.route('/').get(getAdmins).post(createAdmin).delete(deleteAdmins);
adminsRouter.route('/:adminId/state').put(updateAdminState);
adminsRouter.route('/:adminId/reset-password').put(updateAdminState);
adminsRouter.route('/:adminId').get(getAdminById).put(updateAdmin);

export default adminsRouter;
