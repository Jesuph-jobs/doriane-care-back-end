import { Router } from 'express';

import {
	createRole,
	deleteRole,
	getGlobalRoles,
	getRole,
	getRoles,
	getSimpleRoles,
	updateRole,
} from '@server/handlers/roles';
// import { validateRequest } from '@server/utils/httpHandlers';

const rolesRouter = Router();

rolesRouter.route('/').get(getRoles).post(createRole);
rolesRouter.route('/global').get(getGlobalRoles);
rolesRouter.route('/simple').get(getSimpleRoles);
rolesRouter.route('/:roleId').get(getRole).put(updateRole).delete(deleteRole);

export default rolesRouter;
