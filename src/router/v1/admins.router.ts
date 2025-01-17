import { Router } from 'express';

import {
	assignRoleToAdmin,
	createAdmin,
	deleteAdmins,
	getAdminById,
	getAdmins,
	resetAdminPassword,
	unassignRoleFromAdmin,
	updateAdmin,
	updateAdminState,
} from '@server/handlers/admins';

const adminsRouter = Router();

adminsRouter.route('/').get(getAdmins).post(createAdmin).delete(deleteAdmins);
adminsRouter.route('/:adminId/state').put(updateAdminState);
adminsRouter.route('/:adminId/role').put(assignRoleToAdmin).delete(unassignRoleFromAdmin);
adminsRouter.route('/:adminId/reset-password').post(resetAdminPassword);
adminsRouter.route('/:adminId').get(getAdminById).put(updateAdmin);

export default adminsRouter;
